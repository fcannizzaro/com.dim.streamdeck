import { Actions } from './actions';
import { useGlobalSettings, useSendToPlugin, useStreamDeck } from './hooks/stream-deck';
import { SettingsBox } from './components/SettingsBox';
import { SettingBody, SettingsHeader } from './components/SettingsHeader';
import { InfoBanner } from './components/DiscordBanner';
import { SetupModal } from './components/SetupModal';

function SimpleBox({ message }) {
  return (
    <SettingsBox>
      <SettingsHeader>
        <span>{message}</span>
      </SettingsHeader>
      <InfoBanner guide={false} />
    </SettingsBox>
  );
}

function App() {
  const { action, info, setMessageFromPlugin } = useStreamDeck();
  const sendToPlugin = useSendToPlugin();
  const [pluginSettings] = useGlobalSettings();

  const { challenges, identifier } = pluginSettings?.ui?.authorization || {};

  if (challenges) {
    return (
      <SetupModal
        challenges={challenges}
        onSave={(challenge) => {
          setMessageFromPlugin({});
          sendToPlugin({
            identifier,
            challenge,
          });
        }}
      />
    );
  }
  const shortAction = action?.replace(`${info?.plugin.uuid}.`, '');
  const Action = Actions[shortAction];

  return (
    <div className='container'>
      <div className='mini-spaced' />
      <div className='content'>
        {!action || !pluginSettings ? (
          <SimpleBox message='loading...' />
        ) : Action && pluginSettings?.connected === true ? (
          <>
            <Action />
            <InfoBanner guide={false} />
          </>
        ) : !pluginSettings?.connected ? (
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

export default App;
