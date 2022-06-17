import React from "react";
import {useSendToPlugin, useSettings} from "../hooks/stream-deck";
import {SettingsBox} from "../components/SettingsBox";
import {SettingsHeader} from "../components/SettingsHeader";
import {SettingsButtons} from "../components/SettingsButtons";

export const PullItem = () => {
    const [settings] = useSettings();
    const sendToPlugin = useSendToPlugin();
    return <SettingsBox>
        <SettingsHeader>
            <div> {settings.label ?? "NO ITEM SELECTED"}</div>
            <div> {settings["subtitle"] ?? ""}</div>
        </SettingsHeader>
        <SettingsButtons>
            <button onClick={() => sendToPlugin({trigger: "selection"})}>
                {settings.item ? "CHANGE" : "PICK"} ON <b>DIM</b>
            </button>
            {
                settings.item && <button onClick={() => sendToPlugin( {trigger: "preview"})}>
                    SHOW
                </button>
            }
        </SettingsButtons>
    </SettingsBox>;
}
