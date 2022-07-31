import React from 'react';
import { useSendToPlugin, useSettings } from '../hooks/stream-deck';
import { SettingsBox } from '../components/SettingsBox';
import { SettingsHeader } from '../components/SettingsHeader';
import { SettingsButtons } from '../components/SettingsButtons';
import { Gesture } from '../components/Gesture';

export const EquipLoadout = () => {
  const [settings] = useSettings();
  const sendToPlugin = useSendToPlugin();
  return (
    <>
      <SettingsBox>
        <SettingsHeader>
          <div> {settings.label ?? 'NO LOADOUT SELECTED'}</div>
          <div> {settings['subtitle'] ?? ''}</div>
        </SettingsHeader>
        <SettingsButtons>
          <button onClick={() => sendToPlugin({ trigger: 'selection' })}>
            {settings.item ? 'CHANGE' : 'PICK'} ON <b>DIM</b>
          </button>
        </SettingsButtons>
      </SettingsBox>
      <div>
        <Gesture gesture='Single Tap' action='Equip the selected loadout' />
      </div>
      <div>
        <Gesture gesture='Double Tap' action='Send Loadout back to the Vault' />
      </div>
      <div>
        <Gesture gesture='Long Press' action='Send Loadout back to the Vault' />
      </div>
    </>
  );
};
