import { Action, BaseAction, KeyEvent } from '@stream-deck-for-node/sdk';
import { open } from 'openurl';
import { sd } from '../index';

interface AppSettings {
  beta: boolean;
}

/*
   Open a specific version of DIM in the browser
*/
@Action('app')
export class DimApp extends BaseAction<AppSettings> {
  async onSingleTap(e: KeyEvent<AppSettings>) {
    open(`https://${e.payload.settings.beta ? 'beta' : 'app'}.destinyitemmanager.com`);
    sd.showOk(e.context);
  }
}
