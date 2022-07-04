import {
  Action,
  AppearDisappearEvent,
  BaseAction,
  KeyEvent,
  PluginSettingsChanged,
  SettingsChanged,
} from '@stream-deck-for-node/sdk';
import { sendToDIM } from '../ws/server';
import { sd } from '../index';
import { PropertyInspectorMessagingEvent } from '@stream-deck-for-node/sdk/src/types/events';
import { bungify } from '../util/bungify';
import { DimSettings } from '../interfaces';
import { cacheOrImage } from '../util/cache';

interface LoadoutSettings {
  character: string;
  loadout: string;
  label: string;
  icon: string;
}

/*
   Equip a selected loadout
*/
@Action('loadout')
export class EquipLoadout extends BaseAction<LoadoutSettings> {
  pending?: string;

  async updateTitle(context: string, settings: LoadoutSettings) {
    if (settings.loadout) {
      sd.setTitle(context, settings.label);
    }
    sd.setImage(context, await cacheOrImage(bungify(settings.icon)));
  }

  async onMessageFromPropertyInspector(e: PropertyInspectorMessagingEvent) {
    switch (e.payload.trigger) {
      case 'selection':
        this.pending = e.context;
        sendToDIM('selection', { selection: 'loadout' });
        break;
    }
  }

  async onAppear(e: AppearDisappearEvent<LoadoutSettings>) {
    await this.updateTitle(e.context, e.payload.settings);
  }

  async onSettingsChanged(e: SettingsChanged<LoadoutSettings>) {
    await this.updateTitle(e.context, e.settings);
  }

  onSingleTap(e: KeyEvent<LoadoutSettings>) {
    sendToDIM('loadout', e.payload.settings);
    sd.showOk(e.context);
  }

  onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {
    if (!this.pending || !e.changedKeys.includes('selection')) {
      return;
    }
    if (sd.pluginSettings.selectionType === 'loadout') {
      sd.setSettings<LoadoutSettings>(this.pending, sd.pluginSettings.selection);
      this.pending = undefined;
    }
  }
}
