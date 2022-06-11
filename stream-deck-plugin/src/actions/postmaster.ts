import {
    Action,
    AppearDisappearEvent,
    BaseAction,
    KeyEvent,
    PluginSettingsChanged,
    SettingsChanged
} from "@stream-deck-for-node/sdk";
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

interface PostmasterSettings {
    style: "percentage" | "counter"
    postmasterItem: "" | "ascendantShards" | "enhancementPrisms" | "spoils"
}

/*
   Show Postmaster items count, ascendant shards, enhancement prisms, etc...
   Tap to pull items
*/
@Action("postmaster")
export class Postmaster extends BaseAction {

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
