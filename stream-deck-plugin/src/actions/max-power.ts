import {
  Action,
  AppearDisappearEvent,
  KeyEvent,
  PluginSettingsChanged,
  SettingsChanged,
} from '@stream-deck-for-node/sdk';
import { sendToDIM } from '../ws/server';
import { sd } from '../index';
import path from 'path';
import { IMAGE_PATH } from '../util/shared';
import { DimSettings } from '../interfaces';
import { BaseDimAction } from './BaseAction';

const IMAGES = {
  total: path.join(IMAGE_PATH, './max-power/power-total.png'),
  base: path.join(IMAGE_PATH, './max-power/power-armor.png'),
  artifact: path.join(IMAGE_PATH, './max-power/power-artifact.png'),
};

interface PowerSettings {
  powerType: 'total' | 'base' | 'artifact';
}

/*
   Show the max power for the current character
   Tap to Equip the Max Power Loadout
*/
@Action('power')
export class MaxPower extends BaseDimAction<PowerSettings> {
  updateItem(context: string, settings: PowerSettings) {
    const powerType = settings.powerType ?? 'total';
    sd.setTitle(context, sd.pluginSettings.maxPower?.[powerType]?.toString() || '?');
    const image = IMAGES[powerType];
    image && sd.setImage(context, image);
  }

  onAppear(e: AppearDisappearEvent<PowerSettings>) {
    this.updateItem(e.context, e.payload.settings);
  }

  onSettingsChanged(e: SettingsChanged<PowerSettings>) {
    this.updateItem(e.context, e.settings);
  }

  async onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {
    if (!e.changedKeys.includes('maxPower')) {
      return;
    }

    await Promise.all(
      Array.from(this.contexts).map(async (context) => {
        const settings = sd.getSettings<PowerSettings>(context);
        this.updateItem(context, settings);
      }),
    );
  }

  onSingleTap(e: KeyEvent) {
    sendToDIM('maxPower');
    sd.showOk(e.context);
  }
}
