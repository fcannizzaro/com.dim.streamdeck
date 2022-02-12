import {Action, BaseAction, KeyEvent} from "@stream-deck-for-node/sdk";
import {callExtension} from "../server";

@Action("refresh")
export class Refresh extends BaseAction {

    onKeyDown(_e: KeyEvent) {
        callExtension("refresh");
    }

}
