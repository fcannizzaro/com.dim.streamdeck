import { Action, KeyEvent } from '@stream-deck-for-node/sdk';
import { open } from 'openurl';
import { sd } from '../index';
import { BaseDimAction } from './BaseAction';

interface AppSettings {
  beta: boolean;
}

/*
   Open a specific version of DIM in the browser
*/
@Action('app')
export class DimApp extends BaseDimAction<AppSettings> {
  async onSingleTap(e: KeyEvent<AppSettings>) {
    open(`https://${e.payload.settings.beta ? 'beta' : 'app'}.destinyitemmanager.com`);
    sd.showOk(e.context);
  }
}
