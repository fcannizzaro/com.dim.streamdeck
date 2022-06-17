import React from "react";
import {useSettings} from "../../hooks/stream-deck";
import Helmet from './helmet.png';
import Chest from './chest.png';
import Boots from './boots.png';
import Gloves from './gloves.png';
import ClassItem from './classItem.png';
import Kinetik from './kinetik.png';
import Energy from './energy.png';
import Power from './power.png';
import {SettingsBox} from "../../components/SettingsBox";
import {SettingsButtons} from "../../components/SettingsButtons";
import {IconButtonBox} from "../../components/IconButtonBox";
import {IconButton} from "../../components/IconButton";

const slots = [
    [Kinetik, "KineticSlot"],
    [Energy, "Energy"],
    [Power, "Power"],
    [Helmet, "Helmet"],
    [Gloves, "Gauntlets"],
    [Chest, "Chest"],
    [Boots, "Leg"],
    [ClassItem, "ClassItem"]
];

export const FreeSlot = () => {
    const [settings, setSettings] = useSettings();
    const slotsButtons = slots.map(([icon, slot], i) =>
        <IconButtonBox key={i}>
            <IconButton
                color="#debf7a"
                icon={icon}
                selected={settings["slot"] === slot}
                onClick={() => setSettings({slot})}/>
        </IconButtonBox>
    )
    return <SettingsBox>
        <SettingsButtons>
            {slotsButtons}
        </SettingsButtons>
    </SettingsBox>
}
