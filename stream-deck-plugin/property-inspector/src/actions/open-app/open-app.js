import React from "react";
import {useSettings} from "../../hooks/stream-deck";
import {SettingsBox} from "../../components/SettingsBox";
import {SettingsButtons} from "../../components/SettingsButtons";
import Logo from './logo.png';
import {IconButtonBox} from "../../components/IconButtonBox";
import {IconButton} from "../../components/IconButton";

const apps = [
    [Logo, '#f6882d', false],
    [Logo, '#00b7c8', true],
]

export const OpenApp = () => {
    const [settings, setSettings] = useSettings();

    const appButtons = apps.map(([icon, color, beta], i) => {
        const selected = beta === (settings.beta === true);
        return <IconButtonBox
            key={i}
            color={color}
            onClick={() => setSettings({beta})}
            selected={selected}>
            <IconButton
                icon={icon}
                color={color}
                selected={selected}
            />
            <span>{beta ? 'Beta' : 'Stable'}</span>
        </IconButtonBox>
    });

    return <SettingsBox>
        <SettingsButtons>
            {appButtons}
        </SettingsButtons>
    </SettingsBox>;

}
