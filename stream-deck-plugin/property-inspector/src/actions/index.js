import {PullItem} from "./pull-item";
import {Metrics} from "./metrics/metrics";
import {EquipLoadout} from "./equip-loadout";
import {FreeSlot} from "./free-slot/free-slot";
import {Vault} from "./vault/vault";
import {Postmaster} from "./postmaster/postmaster";
import {OpenApp} from "./open-app/open-app";
import {Search} from "./search";
import {Randomize} from "./randomize/randomize";
import {MaxPower} from "./max-power/max-power";

export const Actions = {
    "pull-item": PullItem,
    "loadout": EquipLoadout,
    "free-slot": FreeSlot,
    "metrics": Metrics,
    "vault": Vault,
    "postmaster": Postmaster,
    "app": OpenApp,
    "search": Search,
    "randomize": Randomize,
    "power": MaxPower
};
