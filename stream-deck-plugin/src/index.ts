import './actions/refresh';
import './actions/randomize';
import './actions/search';
import './actions/equip-loadout';
import './actions/vault';
import './actions/dim-app';
import './actions/postmaster';
import './actions/metrics';
import './actions/max-power';
import './actions/farming-mode';
import './actions/pull-item';
import './actions/rotations';
// import './actions/free-slot';

import { StreamDeck } from '@stream-deck-for-node/sdk';
import { init } from './ws/server';
import { DimSettings } from './interfaces';

export const sd = new StreamDeck<DimSettings>();

export const DimView = sd.registerDynamicView('page', 'DIM-Enhanced');

process.on('uncaughtException', (e) => {
  console.log(e);
  sd.logMessage('Error: ' + e.message);
});

sd.ready().then(init);

// Reset Plugin (Development Only)
// setTimeout(() => sd.resetPluginSettings(), 4000);
