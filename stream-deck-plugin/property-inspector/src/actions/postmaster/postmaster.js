import React from 'react';
import { useSettings } from '../../hooks/stream-deck';
import Shard from './shard.jpg';
import Spoils from './spoils.jpg';
import Prism from './Prism.jpg';
import PostmasterIcon from './postmaster.png';
import Percent from './percent.png';
import Count from './count.png';

import { SettingsBox } from '../../components/SettingsBox';
import { SettingsButtons } from '../../components/SettingsButtons';
import { IconButtonBox } from '../../components/IconButtonBox';
import { IconButton } from '../../components/IconButton';
import { Gesture } from '../../components/Gesture';
import { ButtonsGroup } from '../../components/ButtonsGroup';

const currencies = [
  [PostmasterIcon, '#e6811e', ''],
  [Spoils, '#713393', 'spoils'],
  [Prism, '#713393', 'enhancementPrisms'],
  [Shard, '#cab14a', 'ascendantShards'],
];

const style = [[Percent, '#e6811e', 'percentage'], [Count, '#e6811e', 'counter'], [], []];

const valueMapping = {
  true: 'tap to collect',
  false: 'do nothing',
};

export const Postmaster = () => {
  const [settings, setSettings] = useSettings();
  const currenciesButtons = currencies.map(([icon, color, postmasterItem], i) => (
    <IconButtonBox key={i}>
      <IconButton
        icon={icon}
        color={color}
        selected={settings['postmasterItem'] === postmasterItem}
        onClick={() => setSettings({ postmasterItem })}
      />
    </IconButtonBox>
  ));

  const styleButtons = style.map(([icon, color, style], i) => (
    <IconButtonBox key={i}>
      {color && (
        <IconButton
          icon={icon}
          color={color}
          selected={settings['style'] === style}
          onClick={() => setSettings({ style })}
        />
      )}
    </IconButtonBox>
  ));

  return (
    <>
      <SettingsBox>
        <SettingsButtons>{currenciesButtons}</SettingsButtons>
        {settings['postmasterItem'] === '' && (
          <>
            <SettingsButtons>{styleButtons}</SettingsButtons>
            <ButtonsGroup
              value={valueMapping[settings.tapToCollect ?? true]}
              onChange={(value) =>
                setSettings({ ...(settings || {}), tapToCollect: value === valueMapping.true })
              }
              items={[valueMapping.true, valueMapping.false]}
            />
          </>
        )}
      </SettingsBox>
      {settings['postmasterItem'] === '' && (
        <div>
          <Gesture gesture='Single Tap' action='Pull all items from the Postmaster (if enabled)' />
        </div>
      )}
    </>
  );
};
