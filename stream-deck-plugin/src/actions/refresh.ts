import {Action, BaseAction, KeyEvent} from "@stream-deck-for-node/sdk";
import {callExtension} from "../server";
import {sd} from "../index";

@Action("refresh")
export class Refresh extends BaseAction {

    onKeyDown(e: KeyEvent) {
        callExtension("refresh");
        sd.showOk(e.context);
    }

}
