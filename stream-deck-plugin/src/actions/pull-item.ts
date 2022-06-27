import {
  Action,
  AppearDisappearEvent,
  BaseAction,
  KeyEvent,
  PluginSettingsChanged,
  PropertyInspectorMessagingEvent,
  SettingsChanged,
} from '@stream-deck-for-node/sdk';
import { sd } from '../index';
import { sendToDIM } from '../ws/server';
import { bungify } from '../util';
import { DimSettings } from '../interfaces';

interface EquipItemSettings {
  item: string;
  label: string;
  subtitle: string;
  icon: string;
}

/*
   Equip a pre-selected item
*/
@Action('pull-item')
export class PullItem extends BaseAction {
  pending?: string;

  updateItem(context: string, settings: EquipItemSettings) {
    if (settings.icon) {
      sd.setImage(context, bungify(settings.icon));
    }
  }

  onSettingsChanged(e: SettingsChanged<EquipItemSettings>) {
    this.updateItem(e.context, e.settings);
    sd.showOk(e.context);
  }

  async onMessageFromPropertyInspector(e: PropertyInspectorMessagingEvent) {
    switch (e.payload.trigger) {
      case 'selection':
        this.pending = e.context;
        sendToDIM('selection', { selection: 'item' });
        break;
      case 'preview':
        const { item } = sd.getSettings(e.context);
        sendToDIM('search', { search: 'id:' + item });
        break;
    }
  }

  onAppear(e: AppearDisappearEvent<EquipItemSettings>) {
    this.updateItem(e.context, e.payload.settings);
  }

  onSingleTap(e: KeyEvent<EquipItemSettings>) {
    if (e.payload.settings.item) {
      sendToDIM('pullItem', e.payload.settings);
      sd.showOk(e.context);
    } else {
      sd.showAlert(e.context);
    }
  }

  onPluginSettingsChanged(e: PluginSettingsChanged<DimSettings>) {
    if (!this.pending || !e.changedKeys.includes('selection')) {
      return;
    }
    if (sd.pluginSettings.selectionType === 'item') {
      sd.setSettings<EquipItemSettings>(this.pending, sd.pluginSettings.selection);
      this.pending = undefined;
    }
  }
}
