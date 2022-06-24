import { Actions } from './actions';
import { useGlobalSettings, useStreamDeck } from './hooks/stream-deck';
import { SettingsBox } from './components/SettingsBox';
import { SettingBody, SettingsHeader } from './components/SettingsHeader';
import { InfoBanner } from './components/DiscordBanner';

function SimpleBox({ message }) {
  return (
    <SettingsBox>
      <SettingsHeader>
        <span>{message}</span>
      </SettingsHeader>
    </SettingsBox>
  );
}

function App() {
  const { action, info } = useStreamDeck();
  const [pluginSettings] = useGlobalSettings();

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

export default App;
