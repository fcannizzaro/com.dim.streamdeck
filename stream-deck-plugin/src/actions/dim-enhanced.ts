import { Action, BaseAction, KeyEvent } from '@stream-deck-for-node/sdk';
import { switchFirstDeviceProfile } from '../util';
import { clients, sendToDIM } from '../ws/server';
import { context2Challenge, saveToken } from '../security/authorization';

/*
   DIM Enhanced tile
   const tiles = sd.allContexts()["com.dim.streamdeck.page"];
*/
@Action('page')
export class DimEnhanced extends BaseAction {
  onSingleTap(e: KeyEvent) {
    const challenge = context2Challenge[e.context];
    if (challenge) {
      sendToDIM(
        'authorization:confirm',
        { challenge: challenge.label },
        clients[challenge.identifier],
        true,
      );
      saveToken(challenge.identifier, challenge.value);
      switchFirstDeviceProfile();
    }
  }
}
