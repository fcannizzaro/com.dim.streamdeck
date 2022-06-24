import WebSocket from 'ws';

interface Loadout {
  id: string;
  label: string;
}

interface LoadoutCharacter {
  label: string;
  items: Loadout[];
}

interface Token {
  identifier: string;
  token: string;
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
    triumphs: number;
    artifactIcon: string;
  };
  vault: {
    vault: string;
    glimmer: string;
    shards: string;
    brightDust: string;
  };
  selection: {
    label: string;
    subtitle: string;
    icon: string;
    item: string;
    loadout: string;
    character: string;
  };
  selectionType: 'item' | 'loadout';
  farmingMode: boolean;
  tokens: Token[];
}

export interface ExtWebSocket extends WebSocket {
  token?: string;
}

export interface Challenge {
  label: number;
  value: string;
  identifier: string;
}

export interface WebSocketMessageArgs extends DimSettings {
  challenges?: Challenge[];
  shareUrl?: string;
}

export interface WebSocketMessage {
  // action to execute on Stream Deck
  action: 'dim:update' | 'dim:share-url' | 'authorization:challenges' | 'authorization:reset';
  // actions parameters
  data: WebSocketMessageArgs;
}

export interface HandlerArgs {
  data: WebSocketMessageArgs;
  ws: ExtWebSocket;
  identifier: string;
  token: string;
}

export type MessageHandlers = Record<WebSocketMessage['action'], (args: HandlerArgs) => void>;

export type DimAction =
  | 'search'
  | 'randomize'
  | 'collectPostmaster'
  | 'refresh'
  | 'farmingMode'
  | 'maxPower'
  | 'freeBucketSlot'
  | 'pullItem'
  | 'selection'
  | 'loadout'
  | 'shareLoadout'
  | 'authorization:init'
  | 'authorization:confirm';

export interface MatrixCell {
  title?: string;
  image?: string;
  data?: Record<string, any>;
}

export type DimEnhancedMatrix = Record<string, MatrixCell>;
