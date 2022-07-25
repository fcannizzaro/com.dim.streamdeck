import {
  Action,
  AppearDisappearEvent,
  KeyEvent,
  PluginSettingsChanged,
  PropertyInspectorMessagingEvent,
  SettingsChanged,
} from '@stream-deck-for-node/sdk';
import { sd } from '../index';
import { sendToDIM } from '../ws/server';
import { DimSettings } from '../interfaces';
import { cachedAny, cachedCanvas } from '../util/cache';
import { bungify } from '../util/bungify';
import { Canvas, loadImage } from 'skia-canvas';
import { join } from 'path';
import { IMAGE_PATH, sharedItemsData } from '../util/shared';
import { addNewItem } from '../util/debounced-jobs';
import { BaseDimAction } from './BaseAction';

export interface EquipItemSettings {
  item: string;
  overlay: string;
  label: string;
  subtitle: string;
  icon: string;
  element?: string;
  power?: number;
  isExotic?: boolean;
}

// canvas positions
const imagePos = 5;
const imageSize = 86;

// cache icons
const glassExotic = loadImage(join(IMAGE_PATH, './glass.png'));
const glassLegendary = loadImage(join(IMAGE_PATH, './glass-legendary.png'));

/*
   Equip a pre-selected item
*/
@Action('pull-item')
export class PullItem extends BaseDimAction<EquipItemSettings> {
  pending?: string;

  async updateItem(context: string, settings: EquipItemSettings) {
    if (settings.icon) {
      sd.setImage(
        context,
        await cachedCanvas(`${settings.icon}-${settings.element}-${settings.power}`, async () => {
          const canvas = new Canvas(96, 96);
          const ctx = canvas.getContext('2d');

          // draw base icon
          const image = await loadImage(bungify(settings.icon)!);
          ctx.drawImage(image, imagePos, imagePos, imageSize, imageSize);

          // draw overlay icon (top-left corner)
          if (settings.overlay) {
            const overlayIcon = await cachedAny(settings.overlay, () =>
              loadImage(bungify(settings.overlay)!),
            );
            ctx.drawImage(overlayIcon, imagePos, imagePos, imageSize, imageSize);
          }

          // draw element icon
          if (settings.element) {
            ctx.fillStyle = '#212121';
            ctx.beginPath();
            ctx.arc(96 - 24, 22, 12, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            const elementsIcon = await cachedAny(settings.element, () =>
              loadImage(bungify(settings.element!)!),
            );
            ctx.drawImage(elementsIcon, 96 - 32, 13.5, 17, 17);
          }

          // draw power icon
          if (settings.power) {
            ctx.fillStyle = '#212121';
            ctx.font = 'bold 14px';
            const text = settings.power.toString();
            const measure = ctx.measureText(text);
            ctx.fillRect(8, 96 - 22, 96 - 16, 14);
            ctx.fillStyle = 'white';
            ctx.fillText(text, (96 - measure.width) / 2, 96 - 10.5);
          }

          // draw glass overlay
          const glass = await (settings.isExotic ? glassExotic : glassLegendary);
          ctx.drawImage(glass, imagePos, imagePos, imageSize, imageSize);
          return canvas.toDataURL('png');
        }),
      );
    }
  }

  async onSettingsChanged(e: SettingsChanged<EquipItemSettings>) {
    await this.updateItem(e.context, e.settings);
    // sd.showOk(e.context);
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

  async onAppear(e: AppearDisappearEvent<EquipItemSettings>) {
    const { item, element, power, isExotic } = e.payload.settings;

    if (item) {
      addNewItem(item);
      const newInfo = sharedItemsData[item];

      if (
        newInfo &&
        (element !== newInfo.element || power !== newInfo.power || isExotic !== newInfo.isExotic)
      ) {
        sd.setSettings(e.context, {
          ...e.payload.settings,
          ...newInfo,
        });
      }
    }

    await this.updateItem(e.context, e.payload.settings);
  }

  pullItem(e: KeyEvent<EquipItemSettings>, equip: boolean = false) {
    if (e.payload.settings.item) {
      sendToDIM('pullItem', {
        ...e.payload.settings,
        equip,
      });
      sd.showOk(e.context);
    } else {
      sd.showAlert(e.context);
    }
  }

  onSingleTap(e: KeyEvent<EquipItemSettings>) {
    this.pullItem(e);
  }

  onLongPress(e: KeyEvent<EquipItemSettings>) {
    this.pullItem(e, true);
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
