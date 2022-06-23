import { Action, BaseAction, KeyEvent } from '@stream-deck-for-node/sdk';
import { sendToDIM } from '../ws/server';
import { sd } from '../index';

interface RandomizeSettings {
  weaponsOnly: boolean;
}

/*
    Randomize the current character
 */
@Action('randomize')
export class Randomize extends BaseAction<RandomizeSettings> {
  onKeyDown(e: KeyEvent) {
    sendToDIM('randomize', e.payload.settings);
    sd.showOk(e.context);
  }
}
