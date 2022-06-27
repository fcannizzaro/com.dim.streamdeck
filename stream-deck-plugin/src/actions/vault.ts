import {
  Action,
  AppearDisappearEvent,
  BaseAction,
  PluginSettingsChanged,
  SettingsChanged,
} from '@stream-deck-for-node/sdk';
import { sd } from '../index';
import path from 'path';
import { IMAGE_PATH } from '../constant';
import commaNumber from 'comma-number';
import { DimSettings } from '../interfaces';

const IMAGES = {
  vault: path.join(IMAGE_PATH, './vault/vault-count.png'),
  glimmer: path.join(IMAGE_PATH, './vault/vault-glimmer.png'),
  brightDust: path.join(IMAGE_PATH, './vault/vault-dust.png'),
  shards: path.join(IMAGE_PATH, './vault/vault-shards.png'),
};

interface VaultSettings {
  item: string;
}

/*
  Show Vault stats like currencies, total slots, etc...
*/
@Action('vault')
export class Vault extends BaseAction<VaultSettings> {
  updateItem(context: string, settings: VaultSettings) {
    sd.setTitle(context, commaNumber(sd.pluginSettings?.vault?.[settings.item]));
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
    if (!e.changedKeys.includes('vault')) {
      return;
    }

    await Promise.all(
      Array.from(this.contexts).map(async (context) => {
        const settings = sd.getSettings<VaultSettings>(context);
        this.updateItem(context, settings);
      }),
    );
  }
}
