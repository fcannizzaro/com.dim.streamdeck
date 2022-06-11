import {
    Action,
    AppearDisappearEvent,
    BaseAction,
    PluginSettingsChanged,
    SettingsChanged
} from "@stream-deck-for-node/sdk";
import {DimSettings, sd} from "../index";
import path from "path";
import {IMAGE_PATH} from "../constant";

const IMAGES = {
    vanguard: path.join(IMAGE_PATH, './metrics-vanguard.png'),
    gambit: path.join(IMAGE_PATH, './metrics-gambit.png'),
    gunsmith: path.join(IMAGE_PATH, './metrics-gunsmith.png'),
    ironBanner: path.join(IMAGE_PATH, './metrics-iron-banner.png'),
    crucible: path.join(IMAGE_PATH, './metrics-crucible.png'),
    trials: path.join(IMAGE_PATH, './metrics-trials.png')
}

interface MetricsSettings {
    metric: "gambit" | "vanguard" | "crucible" | "trials" | "ironBanner" | "gunsmith" | "battlePass";
}

/*
   Show playlists metrics, progress, etc..
*/
@Action("metrics")
export class Metrics extends BaseAction {

    updateItem(context: string, settings: MetricsSettings) {
        const metrics = sd.pluginSettings.metrics || {};
        const title = metrics?.[settings.metric]?.toString() || "-";
        sd.setTitle(context, title);
        const image = IMAGES[settings.metric];
        if (settings.metric === "battlePass") {
            sd.setImage(context, `https://www.bungie.net${sd.pluginSettings.metrics.artifactIcon}`);
        } else {
            image && sd.setImage(context, image);
        }
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
