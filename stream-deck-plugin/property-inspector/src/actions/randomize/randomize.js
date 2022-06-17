import React from "react";
import {useSettings} from "../../hooks/stream-deck";
import {SettingsBox} from "../../components/SettingsBox";
import {SettingsButtons} from "../../components/SettingsButtons";
import {IconButtonBox} from "../../components/IconButtonBox";
import {IconButton} from "../../components/IconButton";
import Weapons from './weapons.png';
import All from './all.png';

const apps = [
    [Weapons, '#f6882d', true],
    [All, '#f6882d', false],
]

export const Randomize = () => {
    const [settings, setSettings] = useSettings();

    const appButtons = apps.map(([icon, color, weaponsOnly], i) => {
        const selected = weaponsOnly === (settings.weaponsOnly === true);
        return <IconButtonBox
            key={i}
            color={color}
            onClick={() => setSettings({weaponsOnly})}
            selected={selected}>
            <IconButton
                icon={icon}
                color={color}
                selected={selected}
            />
            <span>{weaponsOnly ? 'Weapons' : 'All'}</span>
        </IconButtonBox>
    });

    return <SettingsBox>
        <SettingsButtons>
            {appButtons}
        </SettingsButtons>
    </SettingsBox>;

}
