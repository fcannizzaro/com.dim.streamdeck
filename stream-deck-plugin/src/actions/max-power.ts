import {
    Action,
    AppearDisappearEvent,
    BaseAction,
    KeyEvent,
    PluginSettingsChanged,
    SettingsChanged
} from "@stream-deck-for-node/sdk";
import {callExtension} from "../server";
import {DimSettings, sd} from "../index";
import path from "path";
import {IMAGE_PATH} from "../constant";

const IMAGES = {
    total: path.join(IMAGE_PATH, './power-total.png'),
    base: path.join(IMAGE_PATH, './power-armor.png'),
    artifact: path.join(IMAGE_PATH, './power-artifact.png')
}

interface PowerSettings {
    powerType: "total" | "base" | "artifact";
}

@Action("power")
export class MaxPower extends BaseAction<PowerSettings> {

    constructor() {
        super();
        // to keep max power / postmaster always updated
        setInterval(() => callExtension("refresh"), 15000);
    }

    updateItem(context: string, settings: PowerSettings) {
        const powerType = settings.powerType ?? "total";
        sd.setTitle(context, sd.pluginSettings.maxPower?.[powerType] || '?');
        const image = IMAGES[powerType];
        image && sd.setImage(context, image);
    }

    onAppear(e: AppearDisappearEvent<PowerSettings>) {
        this.updateItem(e.context, e.payload.settings);
    }

    onSettingsChanged(e: SettingsChanged<PowerSettings>) {
        this.updateItem(e.context, e.settings);
    }

    async onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {

        if (!e.changedKeys.includes("maxPower")) {
            return;
        }

        await Promise.all(Array.from(this.contexts).map(async (context) => {
            const settings = await sd.getSettings<PowerSettings>(context);
            this.updateItem(context, settings);
        }));

    }

    onKeyDown(e: KeyEvent) {
        callExtension("maxPower");
        sd.showOk(e.context);
    }

}
