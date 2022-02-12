import {Action, BaseAction, KeyEvent} from "elgato-stream-deck-sdk";
import {callExtension} from "../server";

interface RandomizeSettings {
    character: string;
}

@Action("randomize")
export class Randomize extends BaseAction<RandomizeSettings> {

    onKeyDown(e: KeyEvent) {
        callExtension("randomize", e.payload.settings);
    }

}
