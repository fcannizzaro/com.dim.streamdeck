import { Action, KeyEvent } from '@stream-deck-for-node/sdk';
import { sendToDIM } from '../ws/server';
import { sd } from '../index';
import { BaseDimAction } from './BaseAction';

interface SearchSettings {
  search: string;
  page: string;
  pullItems: boolean;
}

/*
   Trigger a pre compiled query and show the results
*/
@Action('search')
export class Search extends BaseDimAction<SearchSettings> {
  onKeyDown(e: KeyEvent<SearchSettings>) {
    sendToDIM('search', e.payload.settings);
    sd.showOk(e.context);
  }
}
