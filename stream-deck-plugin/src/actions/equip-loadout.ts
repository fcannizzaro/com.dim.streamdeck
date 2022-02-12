import {Action, AppearDisappearEvent, BaseAction, KeyEvent, SettingsChanged} from "elgato-stream-deck-sdk";
import {callExtension} from "../server";
import {sd} from "../index";

interface LoadoutSettings {
    character: string;
    loadout: string;
}

@Action("loadout")
export class EquipLoadout extends BaseAction<LoadoutSettings> {

    updateTitle(context: string, settings: LoadoutSettings) {
        sd.setTitle(context, settings.loadout);
    }

    onAppear(e: AppearDisappearEvent<LoadoutSettings>) {
        this.updateTitle(e.context, e.payload.settings);
    }

    onSettingsChanged(e: SettingsChanged<LoadoutSettings>) {
        this.updateTitle(e.context, e.settings);
    }

    onKeyDown(e: KeyEvent<LoadoutSettings>) {
        callExtension("loadout", e.payload.settings);
    }

}
