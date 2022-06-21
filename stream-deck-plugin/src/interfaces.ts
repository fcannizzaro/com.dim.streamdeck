import WebSocket from 'ws';

interface Loadout {
  id: string;
  label: string;
}

interface LoadoutCharacter {
  label: string;
  items: Loadout[];
}

interface Authorization {
  identifier: string;
  sharedKey: string;
}

export interface DimSettings {
  connected: boolean;
  loadouts: Record<string, LoadoutCharacter>;
  postmaster: {
    total: number;
    ascendantShards?: number;
    enhancementPrisms?: number;
    spoils?: number;
  };
  maxPower: {
    total: string;
    base: string;
    artifact: number;
  };
  metrics: {
    battlePass: number;
    vanguard: number;
    crucible: number;
    gambit: number;
    trials: number;
    gunsmith: number;
    ironBanner: number;
    artifactIcon: string;
  };
  vault: {
    vault: string;
    glimmer: string;
    shards: string;
    brightDust: string;
  };
  authorization: Authorization[];
  selection: any;
  selectionType: 'item' | 'loadout';
  farmingMode: boolean;
  challenge: number;
}

export interface ExtWebSocket extends WebSocket {
  sharedKey?: string;
}
