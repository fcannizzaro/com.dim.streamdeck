import { Action, AppearDisappearEvent, BaseAction } from '@stream-deck-for-node/sdk';
import { sd } from '../index';

/*
   DIM Enhanced tile
   const tiles = sd.allContexts()["com.dim.streamdeck.page"];
*/
@Action('page')
export class DimEnhanced extends BaseAction {
  onAppear(e: AppearDisappearEvent) {
    // reset tile
    sd.setTitle(e.context, '');
  }
}
