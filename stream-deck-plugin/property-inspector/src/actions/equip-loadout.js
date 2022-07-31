import React from 'react';
import { useSendToPlugin, useSettings } from '../hooks/stream-deck';
import { SettingsBox } from '../components/SettingsBox';
import { SettingsHeader } from '../components/SettingsHeader';
import { SettingsButtons } from '../components/SettingsButtons';
import { Gesture } from '../components/Gesture';
import { ButtonsGroup } from '../components/ButtonsGroup';

const valueMapping = {
  doubleTap: 'double tap',
  longPress: 'long press',
};

export const EquipLoadout = () => {
  const [settings, setSettings] = useSettings();
  const sendToPlugin = useSendToPlugin();

  const sendBackGesture = settings.sendBackGesture ?? 'longPress';

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
        <ButtonsGroup
          title={'Send back gesture'}
          value={valueMapping[sendBackGesture]}
          onChange={(value) =>
            setSettings({
              ...settings,
              sendBackGesture: value === 'double tap' ? 'doubleTap' : 'longPress',
            })
          }
          items={[valueMapping.doubleTap, valueMapping.longPress]}
        />
      </SettingsBox>
      <div>
        <Gesture gesture='Single Tap' action='Equip the selected loadout' />
        <Gesture
          gesture={settings.sendBackGesture === 'doubleTap' ? 'Double Tap' : 'Long Press'}
          action='Send Loadout back to the Vault'
        />
      </div>
    </>
  );
};
