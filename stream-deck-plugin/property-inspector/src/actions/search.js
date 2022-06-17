import React from "react";
import {useSettings} from "../hooks/stream-deck";
import {SettingsBox} from "../components/SettingsBox";
import styled from 'styled-components';

const TextAreaSearch = styled.textarea`
  background: #3d3d3d;
  outline: none;
  border: none;
  color: white;
  width: calc(100% - 16px);
  resize: none;
  padding: 8px;
`
export const Search = () => {
    const [settings, setSettings] = useSettings();

    return <SettingsBox>
        <TextAreaSearch
            rows={5}
            placeholder="Search item/perk"
            onChange={it => setSettings({search: it.target.value})}
            value={settings.search || ""}
        />
    </SettingsBox>;

}
