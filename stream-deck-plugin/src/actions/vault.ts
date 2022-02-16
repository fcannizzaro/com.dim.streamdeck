import {
    Action,
    AppearDisappearEvent,
    BaseAction,
    PluginSettingsChanged,
    SettingsChanged
} from "@stream-deck-for-node/sdk";
import {DimSettings, sd} from "../index";
import path from "path";

const IMAGES = {
    vault: path.join(__dirname, './images/vault-count.png'),
    glimmer: path.join(__dirname, './images/vault-glimmer.png'),
    brightDust: path.join(__dirname, './images/vault-dust.png'),
    shards: path.join(__dirname, './images/vault-shards.png'),
}

interface VaultSettings {
    item: string;
}

@Action("vault")
export class Vault extends BaseAction<VaultSettings> {

    updateItem(context: string, settings: VaultSettings) {
        sd.setTitle(context, sd.pluginSettings?.vault?.[settings.item]);
        const image = IMAGES[settings.item];
        image && sd.setImage(context, image);
    }

    onAppear(e: AppearDisappearEvent<VaultSettings>) {
        this.updateItem(e.context, e.payload.settings);
    }

    onSettingsChanged(e: SettingsChanged<VaultSettings>) {
        this.updateItem(e.context, e.settings);
    }

    async onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {

        if (!e.changedKeys.includes("vault")) {
            return;
        }

        await Promise.all(Array.from(this.contexts).map(async (context) => {
            const settings = await sd.getSettings<VaultSettings>(context);
            this.updateItem(context, settings);
        }));

    }

}
