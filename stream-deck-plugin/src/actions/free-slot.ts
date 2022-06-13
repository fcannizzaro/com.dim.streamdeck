import {Action, AppearDisappearEvent, BaseAction, KeyEvent, SettingsChanged} from "@stream-deck-for-node/sdk";
import {sd} from "../index";
import path from "path";
import {IMAGE_PATH} from "../constant";
import {callExtension} from "../server";


interface FreeSlotSettings {
    slot: "helmet" | "gloves" | "chest" | "boots" | "class" | "kinetic" | "energy" | "power";
}

/*
   Free up a single slot in the inventory (helmet, arms, chest, primary, etc..)
*/
@Action("free-slot")
export class FreeSlot extends BaseAction {

    updateItem(context: string, settings: FreeSlotSettings) {
        sd.setImage(context, path.join(IMAGE_PATH, `./slot-${settings.slot}.png`));
    }

    onSettingsChanged(e: SettingsChanged<FreeSlotSettings>) {
        this.updateItem(e.context, e.settings);
    }

    onAppear(e: AppearDisappearEvent<FreeSlotSettings>) {
        this.updateItem(e.context, e.payload.settings);
    }

    onSingleTap(e: KeyEvent<FreeSlotSettings>) {
        callExtension('free-slot', e.payload.settings);
        sd.showOk(e.context);
    }

}
