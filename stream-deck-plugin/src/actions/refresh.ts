import { Action, BaseAction, KeyEvent } from '@stream-deck-for-node/sdk';
import { sendToDIM } from '../ws/server';
import { sd } from '../index';

/*
   Trigger the DIM refresh action (auto-refresh is triggered every 15s by default)
*/
@Action('refresh')
export class Refresh extends BaseAction {
  onKeyDown(e: KeyEvent) {
    sendToDIM('refresh');
    sd.showOk(e.context);
  }
}
