import {
    Action,
    AppearDisappearEvent,
    BaseAction,
    KeyEvent,
    PluginSettingsChanged,
    PropertyInspectorMessagingEvent,
    SettingsChanged
} from "@stream-deck-for-node/sdk";
import {DimSettings, sd} from "../index";
import {callExtension} from "../server";

interface EquipItemSettings {
    item: string;
    icon?: string;
}

/*
   Equip a pre-selected item
*/
@Action("equip-item")
export class EquipItem extends BaseAction {

    waiting?: string;

    updateItem(context: string, settings: EquipItemSettings) {
        if (settings.icon) {
            sd.setImage(context, `https://www.bungie.net${settings.icon}`);
        }
    }

    onSettingsChanged(e: SettingsChanged<EquipItemSettings>) {
        this.updateItem(e.context, e.settings);
        sd.showOk(e.context);
    }

    async onMessageFromPropertyInspector(e: PropertyInspectorMessagingEvent) {
        if (e.payload["selection"]) {
            this.waiting = e.context;
            callExtension("selection", e.payload);
        } else if (e.payload["preview"]) {
            const {item} = await sd.getSettings(e.context);
            callExtension("search", {search: 'id:' + item});
        }
    }

    onAppear(e: AppearDisappearEvent<EquipItemSettings>) {
        this.updateItem(e.context, e.payload.settings);
    }

    onSingleTap(e: KeyEvent<EquipItemSettings>) {
        callExtension('equip-item', e.payload.settings);
        sd.showOk(e.context);
    }

    async onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {
        if (!e.changedKeys.includes("selection") || !this.waiting) {
            return;
        }
        sd.setSettings<EquipItemSettings>(this.waiting, sd.pluginSettings.selection);
        this.waiting = undefined;
    }

}
