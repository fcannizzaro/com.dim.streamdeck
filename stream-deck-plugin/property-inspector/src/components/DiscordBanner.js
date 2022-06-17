import {SettingsButtons} from "./SettingsButtons";
import {DISCORD_INVITE} from "../constant";
import Discord from "../images/discord.png";
import styled from "styled-components";

const DiscordButton = styled.button`
  display: flex;
  align-items: center;

  & img {
    margin: 2px 8px 2px 4px;
    height: 16px;
  }
`

export const InfoBanner = ({discord = 'DISCORD', opacity = false}) => {
    return <SettingsButtons opacity>
        <button onClick={() => window.open('https://dim-stream-deck.netlify.app/')}>SITE</button>
        <DiscordButton onClick={() => window.open(DISCORD_INVITE)}>
            <img src={Discord} alt="discord"/>
            <span>{discord}</span>
        </DiscordButton>
    </SettingsButtons>
}
