import {Action, BaseAction, KeyEvent} from "@stream-deck-for-node/sdk";
import {callExtension} from "../server";
import {sd} from "../index";

interface RandomizeSettings {
    character: string;
}

@Action("randomize")
export class Randomize extends BaseAction<RandomizeSettings> {

    onKeyDown(e: KeyEvent) {
        callExtension("randomize", e.payload.settings);
        sd.showOk(e.context);
    }

}
