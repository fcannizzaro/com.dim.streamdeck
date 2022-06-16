import {
    Action,
    AppearDisappearEvent,
    BaseAction,
    KeyEvent,
    PluginSettingsChanged,
    SettingsChanged
} from "@stream-deck-for-node/sdk";
import {sendToDIM} from "../server";
import {DimSettings, sd} from "../index";
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

    pending?: string;

    updateTitle(context: string, settings: LoadoutSettings) {
        const loadouts = sd.pluginSettings.loadouts;
        const loadout = loadouts[settings.character]?.items.find(it => it.id === settings.loadout);
        if (loadout) {
            sd.setTitle(context, loadout.label);
        }
    }

    async onMessageFromPropertyInspector(e: PropertyInspectorMessagingEvent) {
        switch (e.payload.trigger) {
            case 'selection':
                this.pending = e.context;
                sendToDIM("selection", {selection: "loadout"});
                break;
        }
    }

    onAppear(e: AppearDisappearEvent<LoadoutSettings>) {
        this.updateTitle(e.context, e.payload.settings);
    }

    onSettingsChanged(e: SettingsChanged<LoadoutSettings>) {
        this.updateTitle(e.context, e.settings);
    }

    onKeyDown(e: KeyEvent<LoadoutSettings>) {
        sendToDIM("loadout", e.payload.settings);
        sd.showOk(e.context);
    }

    onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {
        if (!this.pending || !e.changedKeys.includes("selection")) {
            return;
        }
        if (sd.pluginSettings.selectionType === 'loadout') {
            sd.setSettings<LoadoutSettings>(this.pending, sd.pluginSettings.selection);
            this.pending = undefined;
        }
    }

}
