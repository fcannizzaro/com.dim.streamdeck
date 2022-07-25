import { Actions } from './actions';
import { useGlobalSettings, useSendToPlugin, useStreamDeck } from './hooks/stream-deck';
import { SettingsBox } from './components/SettingsBox';
import { SettingBody, SettingsHeader } from './components/SettingsHeader';
import { InfoBanner } from './components/DiscordBanner';
import { useEffect, useRef } from 'react';
import { SetupModal } from './components/SetupModal';

function SimpleBox({ message }) {
  return (
    <SettingsBox>
      <SettingsHeader>
        <span>{message}</span>
      </SettingsHeader>
    </SettingsBox>
  );
}

function SettingsPanel() {
  const { action, info, messageFromPlugin, setMessageFromPlugin } = useStreamDeck();
  const sendToPlugin = useSendToPlugin();
  const [pluginSettings] = useGlobalSettings();

  const w = useRef(null);

  useEffect(() => {
    const listener = async ({ detail }) => {
      setMessageFromPlugin({});
      sendToPlugin({
        identifier: messageFromPlugin.identifier,
        challenge: detail,
      });
    };
    document.addEventListener('saveChallenge', listener);
    return () => document.removeEventListener('saveChallenge', listener);
  }, [messageFromPlugin, sendToPlugin, setMessageFromPlugin]);

  useEffect(() => {
    const challenges = messageFromPlugin['challenges'];
    if (challenges) {
      const setup = encodeURIComponent(JSON.stringify(challenges));
      w.current && w.current.close();
      w.current = window.open(`index.html?setup=${setup}`);
    }
  }, [messageFromPlugin]);

  const shortAction = action?.replace(`${info?.plugin.uuid}.`, '');
  const Action = Actions[shortAction];
  return (
    <div className='container'>
      <div className='mini-spaced' />
      <div className='content'>
        {!action ? (
          <SimpleBox message='loading...' />
        ) : Action && pluginSettings.connected === true ? (
          <>
            <Action />
            <InfoBanner guide={false} discord='DISCORD SERVER' />
          </>
        ) : pluginSettings.connected === false ? (
          <SettingsBox error>
            <SettingsHeader error>
              <span>Error</span>
            </SettingsHeader>
            <SettingBody>
              The <b>plugin</b> is not enabled, not authorized or <b>DIM</b> is closed
            </SettingBody>
            <InfoBanner />
          </SettingsBox>
        ) : (
          <SimpleBox message='No settings for this action' />
        )}
      </div>
    </div>
  );
}

function App({ isSetup }) {
  return isSetup ? <SetupModal /> : <SettingsPanel />;
}

export default App;
