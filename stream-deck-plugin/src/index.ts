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

import {StreamDeck} from "@stream-deck-for-node/sdk";

export interface DimSettings {
    loadouts: Record<string, string[]>
    membershipId: string
    membershipType: string
    postmaster: {
        total: number
        ascendantShards?: number
        enhancementPrisms?: number
        spoils ?: number
    }
    maxPower: {
        total: string
        base: string
        artifact: string
    }
    metrics: {
        battlePass: number;
        vanguard: number;
        crucible: number;
        gambit: number;
        trials: number;
    }
    vault: {
        vault: string
        glimmer: string
        shards: string
        brightDust: string
    },
    farmingMode: boolean
}

export const sd = new StreamDeck<DimSettings>();

process.on('uncaughtException', (e) => {
    console.log(e);
    sd.logMessage('Error: ' + e.message);
});
