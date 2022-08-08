import Head from 'next/head'
import Elgato from "../resources/elgato.png";
import Discord from "../resources/discord.png";
import Image from 'next/image'
import Header from "./header";
import MetricsActions from '../resources/metrics.png';
import MetricsSettings from '../resources/metrics-settings.png';
import PullItemActionSettings from '../resources/pull-item-settings.png';
import PullItemActionSettings1 from '../resources/pull-item-settings-1.png';
import SearchSettings from '../resources/sesrch-settings.png';
import OpenDimSettings from '../resources/open-dim-settings.png';
import RandomizeAction from '../resources/randomize-settings.png';
import MaxPowerSettings from '../resources/max-power-settings.png';
import MaxPowerAction from '../resources/max-power-actions.png';
import PostmasterAction from '../resources/postmaster-action.png';
import PostmasterSettings from '../resources/postmaster-settings.png';
import VaultSettings from '../resources/vault-settings.png';
import FarmingModeSettings from '../resources/farming-mode.png';
import DonateButton from "./DonateButton";
import Patreon from '../resources/patreon.png';
import Icon from '../resources/icon.png';
import LoadoutSettings1 from '../resources/loadout-settings-1.png';
import LoadoutSettings2 from '../resources/loadout-settings-2.png';
import SendLoadout from '../resources/send-loadout.png';

export default function Home() {
    return (
        <div>
            <Head>
                <title>DIM Stream Deck</title>
                <meta name="description"
                      content="A Stream Deck plugin to interact with Destiny Item Manager"/>
                <meta name="og:description"
                      content="A Stream Deck plugin to interact with Destiny Item Manager"/>
                <meta name="og:title" content="DIM Stream Deck"/>
                <meta name="og:image" content="https://dim-stream-deck.netlify.app/frontpage.png"/>
                <link rel="icon" type="image/png" href="/icon.png"/>
            </Head>

            <main className="has-navbar-fixed-top">

                <Header/>

                <div className="container is-max-widescreen p-5">

                    <img alt="plugin-icon" src={Icon.src}/>

                    <h1 className="title is-size-1 mt-5 has-text-white has-text-weight-normal">
                        Use DIM Buttons!
                    </h1>

                    <p className="subtitle is-3 has-text-grey">Equip Loadouts, Pull items, Search, and much more.</p>

                    <div className="intro-buttons">
                        <a href='https://apps.elgato.com/plugins/com.dim.streamdeck'
                           target='_blank'>
                            <div className="download-button elgato">
                                <div className="download-icon">
                                    <Image src={Elgato} alt="elgato"/>
                                </div>
                                <div className="download-text">
                                    <span>Install the plugin</span>
                                    <span>com.dim.streamdeck</span>
                                </div>
                            </div>
                        </a>
                        <a href='https://discord.gg/evUfsxmGuv'
                           target='_blank'>
                            <div className="download-button elgato discord">
                                <div className="download-icon">
                                    <Image src={Discord} alt="discord"/>
                                </div>
                                <div className="download-text">
                                    <span>Discord Server</span>
                                    <span>discord.gg/evUfsxmGuv</span>
                                </div>
                            </div>
                        </a>
                    </div>

                    <h1 className="title is-size-2 has-text-white has-text-weight-normal mt-6 pt-2 pb-2">Metrics</h1>

                    <div className="columns">
                        <div className="column">
                            <p className="subtitle is-3 has-text-grey mb-4 pl-2">Battle Pass Level</p>
                            <p className="subtitle is-3 has-text-grey mb-4 pl-2">Triumphs Score
                                <span className="tag is-primary has-text-weight-bold is-dark ml-2">WIP</span>
                            </p>
                            <p className="subtitle is-3 has-text-grey mb-4 pl-2">Playlist Ranking</p>
                            <p className="subtitle is-5 pl-3 has-text-grey mb-4">- Vanguard</p>
                            <p className="subtitle is-5 pl-3 has-text-grey mb-4">- Crucible</p>
                            <p className="subtitle is-5 pl-3 has-text-grey mb-4">- Gambit</p>
                            <p className="subtitle is-5 pl-3 has-text-grey mb-4">- Trials</p>
                            <p className="subtitle is-5 pl-3 has-text-grey mb-4">- Gunsmith</p>
                            <p className="subtitle is-5 pl-3 has-text-grey mb-4">- Iron Banner</p>
                        </div>
                        <div className="column">
                            <img className="box-shadow" src={MetricsActions.src} alt="metrics"/>
                            <img className="box-shadow mt-2" src={MetricsSettings.src} alt="metrics-settings"/>
                        </div>
                    </div>

                    <h1 className="title is-size-2 has-text-white has-text-weight-normal mt1 pb-2">Pull Item</h1>

                    <div className="columns">
                        <div className="column">
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- tap to pull an item</p>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- tap to move to vault if already
                                pulled</p>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- select an item on DIM (by clicking on
                                the
                                inventory item)</p>
                        </div>
                        <div className="column">
                            <img className="box-shadow mt-2" src={PullItemActionSettings.src} alt="pull-item-settings"/>
                            <img className="box-shadow mt-2" src={PullItemActionSettings1.src}
                                 alt="pull-item-settings"/>
                        </div>
                    </div>

                    <h1 className="title is-size-2 has-text-white has-text-weight-normal mt1 pb-2">Equip Loadout</h1>

                    <div className="columns">
                        <div className="column">
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- tap to equip the select loadout</p>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- select a loadout on DIM (by clicking
                                on the send button)</p>
                            <img className="box-shadow mt-2" src={SendLoadout.src} alt="send-loadout-button"/>
                        </div>
                        <div className="column">
                            <img className="box-shadow mt-2" src={LoadoutSettings1.src} alt="loadout-settings-1"/>
                            <img className="box-shadow mt-2" src={LoadoutSettings2.src} alt="loadout-settings-2"/>
                        </div>
                    </div>

                    <h1 className="title is-size-2 has-text-white has-text-weight-normal mt1 pb-2">Search</h1>

                    <div className="columns">
                        <div className="column">
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- search a pre-chosen query</p>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- select a page</p>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- search or pull searched items</p>
                        </div>
                        <div className="column">
                            <img className="box-shadow mt-2" src={SearchSettings.src} alt="search-settings"/>
                        </div>
                    </div>

                    <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal mt1 pb-2">
                        and much more...
                    </h1>

                    <div className="columns">
                        <div className="column">
                            <h1 className="title is-size-4 has-text-white has-text-weight-normal mt1 pb-2">Farming
                                Mode</h1>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- enable/disable the farming mode</p>
                            <img className="box-shadow mt-2" src={FarmingModeSettings.src} alt="farming-mode-action"/>
                        </div>
                        <div className="column">
                            <h1 className="title is-size-4 has-text-white has-text-weight-normal mt1 pb-2">Open
                                DIM</h1>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- open the DIM application</p>
                            <img className="box-shadow mt-2" src={OpenDimSettings.src} alt="openDim-action"/>
                        </div>
                    </div>

                    <div className="columns">
                        <div className="column">
                            <h1 className="title is-size-4 has-text-white has-text-weight-normal mt1 pb-2">Randomize</h1>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- randomize current character</p>
                            <img className="box-shadow mt-2" src={RandomizeAction.src} alt="randomize-action"/>
                        </div>
                        <div className="column">
                            <h1 className="title is-size-4 has-text-white has-text-weight-normal mt1 pb-2">Vault</h1>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- vault / currencies counter</p>
                            <img className="box-shadow mt-2" src={VaultSettings.src} alt="vault-settings"/>
                        </div>
                    </div>

                    <div className="columns">
                        <div className="column">
                            <h1 className="title is-size-4 has-text-white has-text-weight-normal mt1 pb-2">Postmaster</h1>
                            <p className="subtitle is-4 has-text-grey mb-4 has-text-weight-bold pl-2">- tap to collect
                                lost items</p>
                            <p className="subtitle is-4 has-text-grey mb-4 has-text-weight-bold pl-2">- counter</p>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-6">- lost items</p>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-6">- spoils of conquer</p>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-6">- enhancement prism</p>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-6">- ascendant shard</p>
                            <p className="subtitle is-4 has-text-grey mb-4 has-text-weight-bold pl-2">- counter
                                style</p>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-6">- percent</p>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-6">- numeric</p>

                            <img className="box-shadow mt-2" src={PostmasterAction.src} alt="postmaster-action"/>
                            <img className="box-shadow mt-2" src={PostmasterSettings.src} alt="postmaster-settings"/>
                        </div>
                        <div className="column">
                            <h1 className="title is-size-4 has-text-white has-text-weight-normal mt1 pb-2">Max
                                Power</h1>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- different types of levels</p>
                            <p className="subtitle is-4 has-text-grey mb-4 pl-2">- tap to maximize the current
                                character</p>
                            <img className="box-shadow mt-2" src={MaxPowerAction.src} alt="max-power-action"/>
                            <img className="box-shadow mt-2" src={MaxPowerSettings.src} alt="max-power-settings"/>
                        </div>
                    </div>

                    <h1 id="donate"
                        className="title is-size-2 has-text-white has-text-weight-normal mt-4 pt-2 pb-2">Donate</h1>

                    <div className="donate-buttons">
                        <DonateButton color="#12c3ff" id="fcannizzaro" label="Support Me on Ko-fi"/>
                        <DonateButton patreon color="#F96854" id="fcannizzaro" icon={Patreon.src}
                                      label="Support Me on Patreon"/>
                    </div>

                </div>

            </main>

        </div>
    )
}
