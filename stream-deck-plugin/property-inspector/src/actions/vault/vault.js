import React from 'react';
import { useSettings } from '../../hooks/stream-deck';
import Glimmer from './glimmer.png';
import Dust from './dust.png';
import Shards from './shards.png';
import VaultIcon from './vault.png';

import { SettingsBox } from '../../components/SettingsBox';
import { SettingsButtons } from '../../components/SettingsButtons';
import { IconButtonBox } from '../../components/IconButtonBox';
import { IconButton } from '../../components/IconButton';

const currencies = [
  [VaultIcon, '#ffffff', 'vault'],
  [Glimmer, '#7dbeec', 'glimmer'],
  [Shards, '#7a2fb4', 'shards'],
  [Dust, '#c6a262', 'brightDust'],
];

export const Vault = () => {
  const [settings, setSettings] = useSettings();
  const currenciesButtons = currencies.map(([icon, color, item], i) => (
    <IconButtonBox key={i}>
      <IconButton
        icon={icon}
        color={color}
        selected={settings['item'] === item}
        onClick={() => setSettings({ item })}
      />
    </IconButtonBox>
  ));
  return (
    <SettingsBox>
      <SettingsButtons>{currenciesButtons}</SettingsButtons>
    </SettingsBox>
  );
};
