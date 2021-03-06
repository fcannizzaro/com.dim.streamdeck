import React from 'react';
import { useSettings } from '../hooks/stream-deck';
import { SettingsBox } from '../components/SettingsBox';
import styled from 'styled-components';
import { ButtonsGroup } from '../components/ButtonsGroup';

const TextAreaSearch = styled.textarea`
  background: #3d3d3d;
  outline: none;
  border: none;
  color: white;
  width: calc(100% - 16px);
  resize: none;
  padding: 8px;
`;

const valueMapping = {
  true: 'pull items',
  false: 'search only',
};

export const Search = () => {
  const [settings, setSettings] = useSettings();

  return (
    <SettingsBox>
      <TextAreaSearch
        rows={5}
        placeholder='Search item/perk'
        onChange={(it) => setSettings({ ...settings, search: it.target.value })}
        value={settings.search || ''}
      />
      <ButtonsGroup
        value={settings.page}
        onChange={(page) => setSettings({ ...settings, page })}
        items={['Inventory', 'Progress', 'Vendors', 'Records']}
      />
      <ButtonsGroup
        value={valueMapping[settings.pullItems ?? false]}
        onChange={(value) => setSettings({ ...settings, pullItems: value === valueMapping.true })}
        items={[valueMapping.false, valueMapping.true]}
      />
    </SettingsBox>
  );
};
