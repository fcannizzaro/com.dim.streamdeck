import {Action, BaseAction, KeyEvent} from "elgato-stream-deck-sdk";
import {callExtension} from "../server";

@Action("refresh")
export class Refresh extends BaseAction {

    onKeyDown(_e: KeyEvent) {
        callExtension("refresh");
    }

}
