import {
    Action,
    AppearDisappearEvent,
    BaseAction,
    KeyEvent,
    PluginSettingsChanged,
    SettingsChanged
} from "@stream-deck-for-node/sdk";
import axios from "axios";
import {DimSettings, sd} from "../index";
import {callExtension} from "../server";
import path from "path";
import {IMAGE_PATH} from "../constant";

const IMAGES = {
    postmaster: path.join(IMAGE_PATH, './postmaster.png'),
    ascendantShards: path.join(IMAGE_PATH, './postmaster-shard.png'),
    enhancementPrisms: path.join(IMAGE_PATH, './postmaster-prism.png'),
    spoils: path.join(IMAGE_PATH, './postmaster-spoils.png')
}

const MATS = {
    SPOILS: 3702027555,
    SHARD: 4257549985,
    PRISM: 4257549984
};

interface PostmasterSettings {
    style: "percentage" | "counter"
    postmasterItem: "" | "ascendantShards" | "enhancementPrisms" | "spoils"
}

interface PostmasterItem {
    quantity: number
    itemHash: number
}

const AXIOS_OPTS = {
    headers: {
        'X-API-Key': 'fcd25f4d685f40a297417847576e4139'
    }
}

@Action("postmaster")
export class Postmaster extends BaseAction {

    constructor() {
        super();
        setTimeout(async () => {
            await this.updatePostmaster();
            setInterval(() => this.updatePostmaster(), 15 * 1000);
        }, 2000);
    }

    async updatePostmaster() {

        try {

            const {membershipType, membershipId} = sd.pluginSettings || {};

            if (!membershipId) {
                return;
            }

            const res = await axios(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=200,201`, AXIOS_OPTS);
            const {Response: {characterInventories, characters}} = res.data;

            const latest = Object.values(characters.data).map((it: any) => [new Date(it["dateLastPlayed"]).getTime(), it["characterId"]]);

            latest.sort((c1: any, c2: any) => {
                if (c1[0] < c2[0]) return 1;
                if (c1[0] > c2[0]) return -1;
                return 0;
            });

            const latestCharacter = latest[0][1];
            const postmasterItems: PostmasterItem[] = characterInventories.data[latestCharacter].items.filter((it: any) => it["bucketHash"] === 215593132);

            const postmaster = {
                total: postmasterItems.length,
                ascendantShards: postmasterItems.find(it => it.itemHash === MATS.SHARD)?.quantity,
                enhancementPrisms: postmasterItems.find(it => it.itemHash === MATS.PRISM)?.quantity,
                spoils: postmasterItems.find(it => it.itemHash === MATS.SPOILS)?.quantity,
            };

            sd.setPluginSettings({
                postmaster
            });

        } catch (e) {
            console.log(e);
        }

    }

    onSettingsChanged(e: SettingsChanged<PostmasterSettings>) {
        this.updateItem(e.context, e.settings);
    }

    onAppear(e: AppearDisappearEvent<PostmasterSettings>) {
        this.updateItem(e.context, e.payload.settings);
    }

    onKeyDown(e: KeyEvent) {
        callExtension("collectPostmaster");
        sd.showOk(e.context);
    }

    async onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {

        if (!e.changedKeys.includes("postmaster")) {
            return;
        }

        await Promise.all(Array.from(this.contexts).map(async (context) => {
            const settings = await sd.getSettings<PostmasterSettings>(context);
            this.updateItem(context, settings);
        }));

    }

    updateItem(context: string, settings: PostmasterSettings) {
        const {total = 0, ...items} = sd.pluginSettings.postmaster || {};
        const title = settings.postmasterItem ?
            items[settings.postmasterItem]?.toString() || "0" :
            settings.style === "percentage" ? `${Math.round(total * 100 / 21)}%` : `${total} / 21`;
        sd.setTitle(context, title);
        sd.setImage(context, IMAGES[settings.postmasterItem || "postmaster"]);
    }

}
