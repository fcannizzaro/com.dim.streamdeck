import {
    Action,
    AppearDisappearEvent,
    BaseAction,
    PluginSettingsChanged,
    SettingsChanged
} from "@stream-deck-for-node/sdk";
import axios from "axios";
import {DimSettings, sd} from "../index";
import path from "path";

const PROGRESSIONS = {
    XP: "243419342",
    GAMBIT: "3008065600",
    TRIALS: "2755675426",
    CRUCIBLE: "2083746873",
    VANGUARD: "457612306"
}

const IMAGES = {
    vanguard: path.join(__dirname, './images/metrics-vanguard.png'),
    gambit: path.join(__dirname, './images/metrics-gambit.png'),
    crucible: path.join(__dirname, './images/metrics-crucible.png'),
    trials: path.join(__dirname, './images/metrics-trials.png'),
    battlePass: path.join(__dirname, './images/metrics-bp.png'),
}

interface MetricsSettings {
    metric: "gambit" | "vanguard" | "crucible" | "trials" | "battlePass";
}

const AXIOS_OPTS = {
    headers: {
        'X-API-Key': 'fcd25f4d685f40a297417847576e4139'
    }
}

@Action("metrics")
export class Metrics extends BaseAction {

    constructor() {
        super();
        setTimeout(async () => {
            await this.updateMetrics();
            setInterval(() => this.updateMetrics(), 60 * 1000);
        }, 2000);
    }

    async updateMetrics() {

        try {
            const {membershipType, membershipId} = sd.pluginSettings || {};

            if (!membershipId) {
                return;
            }

            const {data} = await axios(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=202`, AXIOS_OPTS);

            const {progressions} = Object.values(data.Response["characterProgressions"].data)[0] as any;
            const totalXP = progressions[PROGRESSIONS.XP]["currentProgress"];

            const metrics = {
                battlePass: Math.ceil(totalXP / 100000),
                vanguard: progressions[PROGRESSIONS.VANGUARD]["currentProgress"],
                trials: progressions[PROGRESSIONS.TRIALS]["currentProgress"],
                crucible: progressions[PROGRESSIONS.CRUCIBLE]["currentProgress"],
                gambit: progressions[PROGRESSIONS.GAMBIT]["currentProgress"],
            };

            sd.setPluginSettings({
                metrics
            });

        } catch (e) {
            console.log(e);
        }

    }

    updateItem(context: string, settings: MetricsSettings) {
        const metrics = sd.pluginSettings.metrics || {};
        const title = metrics?.[settings.metric]?.toString() || "-";
        sd.setTitle(context, title);
        const image = IMAGES[settings.metric];
        image && sd.setImage(context, image);
    }

    onSettingsChanged(e: SettingsChanged<MetricsSettings>) {
        this.updateItem(e.context, e.settings);
    }

    onAppear(e: AppearDisappearEvent<MetricsSettings>) {
        this.updateItem(e.context, e.payload.settings);
    }

    async onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {

        if (!e.changedKeys.includes("metrics")) {
            return;
        }

        await Promise.all(Array.from(this.contexts).map(async (context) => {
            const settings = await sd.getSettings<MetricsSettings>(context);
            this.updateItem(context, settings);
        }));

    }

}
