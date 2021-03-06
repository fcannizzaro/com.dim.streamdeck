import { Action, BaseAction, KeyEvent } from '@stream-deck-for-node/sdk';
import { sendToDIM } from '../ws/server';
import { sd } from '../index';

interface SearchSettings {
  search: string;
  page: string;
  pullItems: boolean;
}

/*
   Trigger a pre compiled query and show the results
*/
@Action('search')
export class Search extends BaseAction<SearchSettings> {
  onKeyDown(e: KeyEvent<SearchSettings>) {
    sendToDIM('search', e.payload.settings);
    sd.showOk(e.context);
  }
}
