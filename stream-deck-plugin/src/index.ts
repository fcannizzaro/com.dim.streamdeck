import "./actions/refresh";
import "./actions/randomize";
import "./actions/search";
import "./actions/equip-loadout";
import "./actions/vault";
import "./actions/app";
import "./actions/postmaster";
import "./actions/metrics";
import "./actions/max-power";
import "./actions/farming-mode";
import "./actions/free-slot";
import "./actions/pull-item";
import "./actions/dim-enhanced";
import "./actions/rotations";

import {StreamDeck} from "@stream-deck-for-node/sdk";
import {sendToDIM, init} from "./server";

interface Loadout {
    id: string;
    label: string;
}

interface LoadoutCharacter {
    label: string;
    items: Loadout[]
}

export interface DimSettings {
    connected: boolean,
    loadouts: Record<string, LoadoutCharacter>
    postmaster: {
        total: number
        ascendantShards?: number
        enhancementPrisms?: number
        spoils?: number
    }
    maxPower: {
        total: string
        base: string
        artifact: number
    }
    metrics: {
        battlePass: number;
        vanguard: number;
        crucible: number;
        gambit: number;
        trials: number;
        gunsmith: number;
        ironBanner: number;
        artifactIcon: string;
    }
    vault: {
        vault: string
        glimmer: string
        shards: string
        brightDust: string
    },
    selection: any,
    selectionType: "item" | "loadout",
    farmingMode: boolean,
}

export const sd = new StreamDeck<DimSettings>();

// Reset Plugin (Development Only)
// setTimeout(() => sd.resetPluginSettings(), 4000);

// to keep max power / postmaster always updated
setInterval(() => sendToDIM("refresh"), 30000);

process.on('uncaughtException', (e) => {
    console.log(e);
    sd.logMessage('Error: ' + e.message);
});

init();
