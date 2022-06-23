import {
  Action,
  AppearDisappearEvent,
  BaseAction,
  KeyEvent,
  SettingsChanged,
} from '@stream-deck-for-node/sdk';
import { sd } from '../index';
import path from 'path';
import { IMAGE_PATH } from '../constant';
import { sendToDIM } from '../ws/server';

interface FreeBucketSlotSetting {
  bucket:
    | 'Helmet'
    | 'Gauntlets'
    | 'Chest'
    | 'Leg'
    | 'ClassItem'
    | 'KineticSlot'
    | 'Energy'
    | 'Power';
}

/*
   Free up a single slot in the inventory (helmet, arms, chest, primary, etc..)
*/
@Action('free-bucket-slot')
export class FreeSlot extends BaseAction {
  updateItem(context: string, settings: FreeBucketSlotSetting) {
    sd.setImage(context, path.join(IMAGE_PATH, `./free-slot/slot-${settings.bucket}.png`));
  }

  onSettingsChanged(e: SettingsChanged<FreeBucketSlotSetting>) {
    this.updateItem(e.context, e.settings);
  }

  onAppear(e: AppearDisappearEvent<FreeBucketSlotSetting>) {
    this.updateItem(e.context, e.payload.settings);
  }

  onSingleTap(e: KeyEvent<FreeBucketSlotSetting>) {
    sendToDIM('freeBucketSlot', e.payload.settings);
    sd.showOk(e.context);
  }
}
