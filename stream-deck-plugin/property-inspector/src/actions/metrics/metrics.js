import React from "react";
import {useSettings} from "../../hooks/stream-deck";
import Vanguard from './vanguard.png';
import Crucible from './crucible.png';
import Osiris from './osiris.png';
import IronBanner from './iron-banner.png';
import Gunsmith from './gunsmith.png';
import Gambit from './gambit.png';
import BattlePass from './battlePass.png';
import {SettingsBox} from "../../components/SettingsBox";
import {SettingsButtons} from "../../components/SettingsButtons";
import {IconButtonBox} from "../../components/IconButtonBox";
import {IconButton} from "../../components/IconButton";

const metrics = [
    [Vanguard, "#5075e5", "vanguard"],
    [Gambit, "#41c0a0", "gambit"],
    [Crucible, "#ce0f0c", "crucible"],
    [Gunsmith, "#69a5c1", "gunsmith"],
    [Osiris, "#debf7a", "trials"],
    [IronBanner, "#408f6e", "ironBanner"],
    [BattlePass, "#712398", "battlePass"],
    []
];

export const Metrics = () => {
    const [settings, setSettings] = useSettings();
    const metricsButtons = metrics.map(([icon, color, metric], i) => <IconButtonBox key={i}>
        {color && <IconButton
            icon={icon}
            color={color}
            selected={settings["metric"] === metric}
            onClick={() => setSettings({
                metric
            })}/>}
    </IconButtonBox>)
    return <SettingsBox>
        <SettingsButtons>
            {metricsButtons}
        </SettingsButtons>
    </SettingsBox>
}
