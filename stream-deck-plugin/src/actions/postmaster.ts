import {
  Action,
  AppearDisappearEvent,
  KeyEvent,
  PluginSettingsChanged,
  SettingsChanged,
} from '@stream-deck-for-node/sdk';
import { sd } from '../index';
import { sendToDIM } from '../ws/server';
import path from 'path';
import { IMAGE_PATH } from '../util/shared';
import { DimSettings } from '../interfaces';
import { BaseDimAction } from './BaseAction';

const IMAGES = {
  postmaster: path.join(IMAGE_PATH, './postmaster/postmaster.png'),
  ascendantShards: path.join(IMAGE_PATH, './postmaster/postmaster-shard.png'),
  enhancementPrisms: path.join(IMAGE_PATH, './postmaster/postmaster-prism.png'),
  spoils: path.join(IMAGE_PATH, './postmaster/postmaster-spoils.png'),
};

interface PostmasterSettings {
  style: 'percentage' | 'counter';
  postmasterItem: '' | 'ascendantShards' | 'enhancementPrisms' | 'spoils';
}

/*
   Show Postmaster items count, ascendant shards, enhancement prisms, etc...
   Tap to pull items
*/
@Action('postmaster')
export class Postmaster extends BaseDimAction<PostmasterSettings> {
  onSettingsChanged(e: SettingsChanged<PostmasterSettings>) {
    this.updateItem(e.context, e.settings);
  }

  onAppear(e: AppearDisappearEvent<PostmasterSettings>) {
    this.updateItem(e.context, e.payload.settings);
  }

  onKeyDown(e: KeyEvent<PostmasterSettings>) {
    if (e.payload.settings.postmasterItem === '') {
      sendToDIM('collectPostmaster');
      sd.showOk(e.context);
    }
  }

  async onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {
    if (!e.changedKeys.includes('postmaster')) {
      return;
    }

    await Promise.all(
      Array.from(this.contexts).map(async (context) => {
        const settings = sd.getSettings<PostmasterSettings>(context);
        settings && this.updateItem(context, settings);
      }),
    );
  }

  updateItem(context: string, settings: PostmasterSettings) {
    const { total = 0, ...items } = sd.pluginSettings.postmaster || {};
    const title = settings.postmasterItem
      ? items[settings.postmasterItem]?.toString() || '0'
      : settings.style === 'percentage'
      ? `${Math.round((total * 100) / 21)}%`
      : `${total} / 21`;
    sd.setTitle(context, title);
    sd.setState(context, settings.postmasterItem === '' ? 1 : 0);
    sd.setImage(context, IMAGES[settings.postmasterItem || 'postmaster']);
  }
}
