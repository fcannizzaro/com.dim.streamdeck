import {
  Action,
  AppearDisappearEvent,
  PluginSettingsChanged,
  SettingsChanged,
} from '@stream-deck-for-node/sdk';
import { sd } from '../index';
import path from 'path';
import { IMAGE_PATH } from '../util/shared';
import commaNumber from 'comma-number';
import { bungify } from '../util/bungify';
import { DimSettings } from '../interfaces';
import { BaseDimAction } from './BaseAction';

const IMAGES = {
  vanguard: path.join(IMAGE_PATH, './metrics/metrics-vanguard.png'),
  gambit: path.join(IMAGE_PATH, './metrics/metrics-gambit.png'),
  gunsmith: path.join(IMAGE_PATH, './metrics/metrics-gunsmith.png'),
  ironBanner: path.join(IMAGE_PATH, './metrics/metrics-iron-banner.png'),
  crucible: path.join(IMAGE_PATH, './metrics/metrics-crucible.png'),
  trials: path.join(IMAGE_PATH, './metrics/metrics-trials.png'),
  triumphs: path.join(IMAGE_PATH, './metrics/metrics-triumphs.png'),
};

interface MetricsSettings {
  metric:
    | 'gambit'
    | 'vanguard'
    | 'crucible'
    | 'trials'
    | 'ironBanner'
    | 'gunsmith'
    | 'triumphs'
    | 'battlePass';
}

/*
   Show playlists metrics, progress, etc..
*/
@Action('metrics')
export class Metrics extends BaseDimAction<MetricsSettings> {
  updateItem(context: string, settings: MetricsSettings) {
    const metrics = sd.pluginSettings.metrics || {};
    const title = commaNumber(metrics?.[settings.metric]) || '-';
    sd.setTitle(context, title);
    const image = IMAGES[settings.metric];
    if (settings.metric === 'battlePass') {
      sd.setImage(context, bungify(sd.pluginSettings.metrics?.artifactIcon));
    } else {
      image && sd.setImage(context, image);
    }
  }

  onSettingsChanged(e: SettingsChanged<MetricsSettings>) {
    this.updateItem(e.context, e.settings);
  }

  onAppear(e: AppearDisappearEvent<MetricsSettings>) {
    this.updateItem(e.context, e.payload.settings);
  }

  async onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {
    if (!e.changedKeys.includes('metrics')) {
      return;
    }

    await Promise.all(
      Array.from(this.contexts).map(async (context) => {
        const settings = sd.getSettings<MetricsSettings>(context);
        this.updateItem(context, settings);
      }),
    );
  }
}
