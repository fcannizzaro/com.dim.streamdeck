import {Action, BaseAction, KeyEvent} from "@stream-deck-for-node/sdk";
import {callExtension} from "../server";

interface SearchSettings {
    search: string;
}

@Action("search")
export class Search extends BaseAction<SearchSettings> {

    onKeyDown(e: KeyEvent<SearchSettings>) {
        callExtension("search", e.payload.settings);
    }

}
