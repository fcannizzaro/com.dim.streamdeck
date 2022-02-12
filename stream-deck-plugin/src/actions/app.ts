import {Action, BaseAction, KeyEvent} from "@stream-deck-for-node/sdk";
import {sd} from "../index";

interface AppSettings {
    beta: boolean;
}

@Action("app")
export class App extends BaseAction<AppSettings> {

    onKeyDown(e: KeyEvent<AppSettings>) {
        sd.openUrl(`https://${e.payload.settings.beta ? 'beta' : 'app'}.destinyitemmanager.com`)
    }

}
