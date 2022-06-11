import {Action, BaseAction, KeyEvent} from "@stream-deck-for-node/sdk";
import {callExtension} from "../server";
import {sd} from "../index";

interface SearchSettings {
    search: string;
}

/*
   Trigger a pre compiled query and show the results
*/
@Action("search")
export class Search extends BaseAction<SearchSettings> {

    onKeyDown(e: KeyEvent<SearchSettings>) {
        callExtension("search", e.payload.settings);
        sd.showOk(e.context);
    }

}
