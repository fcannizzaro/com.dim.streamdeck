import { Action, KeyEvent } from '@stream-deck-for-node/sdk';
import { sendToDIM } from '../ws/server';
import { sd } from '../index';
import { BaseDimAction } from './BaseAction';

interface RandomizeSettings {
  weaponsOnly: boolean;
}

/*
    Randomize the current character
 */
@Action('randomize')
export class Randomize extends BaseDimAction<RandomizeSettings> {
  onKeyDown(e: KeyEvent) {
    sendToDIM('randomize', e.payload.settings);
    sd.showOk(e.context);
  }
}
