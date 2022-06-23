import { Actions } from './actions';
import { useGlobalSettings, useStreamDeck } from './hooks/stream-deck';
import { SettingsBox } from './components/SettingsBox';
import { SettingBody, SettingsHeader } from './components/SettingsHeader';
import { InfoBanner } from './components/DiscordBanner';

function App() {
  const { action, info } = useStreamDeck();
  const [pluginSettings] = useGlobalSettings();

  console.log(pluginSettings);

  const shortAction = action?.replace(`${info?.plugin.uuid}.`, '');
  const Action = Actions[shortAction];

  if (!Action) {
    return <></>;
  }

  return (
    <div className='container'>
      <div className='mini-spaced' />
      <div className='content'>
        {!pluginSettings.connected ? (
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
          <>
            <Action />
            <InfoBanner guide={false} discord='DISCORD SERVER' />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
