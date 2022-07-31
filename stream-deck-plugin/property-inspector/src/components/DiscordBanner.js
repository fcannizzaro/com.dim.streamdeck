import { SettingsButtons } from './SettingsButtons';
import { DISCORD_INVITE } from '../constant';
import Discord from '../images/discord.png';
import styled from 'styled-components';
import { useOpenUrl } from '../hooks/stream-deck';

const DiscordButton = styled.button`
  display: flex;
  align-items: center;

  & img {
    margin: 2px 8px 2px 4px;
    height: 16px;
  }
`;

export const InfoBanner = ({ discord = 'DISCORD' }) => {
  const openUrl = useOpenUrl();
  return (
    <SettingsButtons opacity>
      <button onClick={() => openUrl('https://dim-stream-deck.netlify.app/')}>SITE</button>
      <DiscordButton onClick={() => openUrl(DISCORD_INVITE)}>
        <img src={Discord} alt='discord' />
        <span>{discord}</span>
      </DiscordButton>
      <button onClick={() => openUrl('https://dim-stream-deck.netlify.app/donate')}>DONATE</button>
    </SettingsButtons>
  );
};
