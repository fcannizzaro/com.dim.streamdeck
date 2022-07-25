import {
  Action,
  AppearDisappearEvent,
  KeyEvent,
  PluginSettingsChanged,
} from '@stream-deck-for-node/sdk';
import { sendToDIM } from '../ws/server';
import { sd } from '../index';
import { DimSettings } from '../interfaces';
import { BaseDimAction } from './BaseAction';

/*
   Enable / disable the farming mode for the current character
*/
@Action('farming-mode')
export class FarmingMode extends BaseDimAction {
  updateItem(context: string) {
    const on = sd.pluginSettings.farmingMode;
    sd.setState(context, on ? 1 : 0);
  }

  onAppear(e: AppearDisappearEvent) {
    this.updateItem(e.context);
  }

  onSingleTap(e: KeyEvent) {
    sendToDIM('farmingMode');
    sd.showOk(e.context);
  }

  async onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {
    if (!e.changedKeys.includes('farmingMode')) {
      return;
    }

    for (const context of Array.from(this.contexts)) {
      this.updateItem(context);
    }
  }
}
