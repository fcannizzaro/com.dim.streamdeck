import "./actions/refresh";
import "./actions/randomize";
import "./actions/search";
import "./actions/equip-loadout";
import "./actions/vault";
import "./actions/app";
import "./actions/postmaster";
import "./actions/metrics";

import {StreamDeck} from "elgato-stream-deck-sdk";

interface DimSettings {
    loadouts: Record<string, string[]>
    membershipId: string
    membershipType: string
    postmaster: {
        total: number
        ascendantShards?: number
        enhancementPrisms?: number
        spoils ?: number
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
    }
}

export const sd = new StreamDeck<DimSettings>();

process.on('uncaughtException', (e) => sd.logMessage('Error: ' + e.message));
