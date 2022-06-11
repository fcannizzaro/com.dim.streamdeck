import {Action, AppearDisappearEvent, BaseAction, KeyEvent, PluginSettingsChanged} from "@stream-deck-for-node/sdk";
import {callExtension} from "../server";
import {DimSettings, sd} from "../index";

/*
   Enable / disable the farming mode for the current character
*/
@Action("farming-mode")
export class FarmingMode extends BaseAction {

    updateItem(context: string) {
        const on = sd.pluginSettings.farmingMode
        sd.setState(context, on ? 1 : 0);
    }

    onAppear(e: AppearDisappearEvent) {
        this.updateItem(e.context);
    }

    async onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {

        if (!e.changedKeys.includes("farmingMode")) {
            return;
        }

        for (const context of Array.from(this.contexts)) {
            this.updateItem(context);
        }

    }

    onKeyDown(e: KeyEvent) {
        callExtension("farmingMode");
        sd.showOk(e.context);
    }

}
