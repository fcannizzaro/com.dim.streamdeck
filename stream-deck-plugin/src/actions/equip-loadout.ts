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
import { bungify } from '../util';
import { DimSettings } from '../interfaces';

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

  updateTitle(context: string, settings: LoadoutSettings) {
    if (settings.loadout) {
      sd.setTitle(context, settings.label);
    }
    sd.setImage(context, bungify(settings.icon));
  }

  async onMessageFromPropertyInspector(e: PropertyInspectorMessagingEvent) {
    switch (e.payload.trigger) {
      case 'selection':
        this.pending = e.context;
        sendToDIM('selection', { selection: 'loadout' });
        break;
    }
  }

  onAppear(e: AppearDisappearEvent<LoadoutSettings>) {
    this.updateTitle(e.context, e.payload.settings);
  }

  onSettingsChanged(e: SettingsChanged<LoadoutSettings>) {
    this.updateTitle(e.context, e.settings);
  }

  onSingleTap(e: KeyEvent<LoadoutSettings>) {
    sendToDIM('loadout', e.payload.settings);
    sd.showOk(e.context);
  }

  onLongPress(e: KeyEvent<LoadoutSettings>) {
    sendToDIM('shareLoadout', e.payload.settings);
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
