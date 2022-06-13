import {Action, AppearDisappearEvent, BaseAction, KeyEvent, SettingsChanged} from "@stream-deck-for-node/sdk";
import {callExtension} from "../server";
import {sd} from "../index";
import {PropertyInspectorMessagingEvent} from "@stream-deck-for-node/sdk/src/types/events";

interface LoadoutSettings {
    character: string;
    loadout: string;
}

/*
   Equip a selected loadout
*/
@Action("loadout")
export class EquipLoadout extends BaseAction<LoadoutSettings> {

    updateTitle(context: string, settings: LoadoutSettings) {
        const loadouts = sd.pluginSettings.loadouts;
        const loadout = loadouts[settings.character]?.items.find(it => it.id === settings.loadout);
        if (loadout) {
            sd.setTitle(context, loadout.label);
        }
    }

    onMessageFromPropertyInspector(e: PropertyInspectorMessagingEvent) {
        console.log(e.context, e.payload, e.action);
    }

    onAppear(e: AppearDisappearEvent<LoadoutSettings>) {
        this.updateTitle(e.context, e.payload.settings);
    }

    onSettingsChanged(e: SettingsChanged<LoadoutSettings>) {
        this.updateTitle(e.context, e.settings);
    }

    onKeyDown(e: KeyEvent<LoadoutSettings>) {
        callExtension("loadout", e.payload.settings);
        sd.showOk(e.context);
    }

}
