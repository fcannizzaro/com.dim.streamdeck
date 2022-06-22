import React from 'react';
import { useSettings } from '../../hooks/stream-deck';
import { SettingsBox } from '../../components/SettingsBox';
import { SettingsButtons } from '../../components/SettingsButtons';
import { IconButtonBox } from '../../components/IconButtonBox';
import { IconButton } from '../../components/IconButton';
import Artifact from './artifact.png';
import Total from './total.png';
import Base from '../free-bucket-slot/helmet.png';
import { Gesture } from '../../components/Gesture';

const apps = [
  [Artifact, '#f6882d', 'artifact'],
  [Base, '#f6882d', 'base'],
  [Total, '#f6882d', 'total'],
];

const labels = {
  total: 'Total',
  base: 'Armor',
  artifact: 'Artifact',
};

export const MaxPower = () => {
  const [settings, setSettings] = useSettings();

  const powerButtons = apps.map(([icon, color, powerType], i) => {
    const selected = powerType === (settings.powerType ?? 'total');
    return (
      <IconButtonBox
        key={i}
        color={color}
        onClick={() => setSettings({ powerType })}
        selected={selected}
      >
        <IconButton icon={icon} color={color} selected={selected} />
        <span>{labels[powerType]}</span>
      </IconButtonBox>
    );
  });

  return (
    <>
      <SettingsBox>
        <SettingsButtons>{powerButtons}</SettingsButtons>
      </SettingsBox>
      <div>
        <Gesture gesture='Single Tap' action='Equip the Max Power loadout' />
      </div>
    </>
  );
};
