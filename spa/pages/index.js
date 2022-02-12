import Head from 'next/head'
import Loadout1 from "./loadodut-1.png";
import Loadout2 from "./loadodut-2.png";
import Postmaster1 from "./postmaster-1.png";
import Postmaster2 from "./postmaster-2.png";
import Search from "./search.png";
import Github from "./github.png";
import Vault from "./vault.png";
import Refresh from "./refresh.png";
import Metrics from "./metrics.png";
import Randomize from "./randomize.png";
import AppPi from "./app.png";
import masterwork from "./masterwork.png";
import Elgato from "./elgato.png";
import Preview from "./preview.png";
import Preview1 from "./preview-1.png";
import Chrome from "./chrome.png";
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

export default function Home() {

    const [emblaRef] = useEmblaCarousel({
        dragFree: true
    })

    return (
        <div className="container">
            <Head>
                <title>DIM Stream Deck</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h1 className="title">
                    DIM Stream Deck
                </h1>

                <p>A Stream Deck plugin to interact with <strong>Destiny Item Manager</strong> and <strong>Destiny
                    2</strong></p>

                <p>This is an open source project.
                    <a className="github-button"
                       href="https://github.com/fcannizzaro/com.dim.streamdeck">
                        <Image src={Github}/> <span>STAR / CONTRIBUTE</span>

                    </a>
                </p>

                <h2 className="header">Installation</h2>

                <div className="installation">
                    <a href='https://chrome.google.com/webstore/detail/odiiafbigbkmleijfhjgidbiefjolcmg'
                       target='_blank'>
                        <div className="download-button">
                            <div className="download-icon">
                                <Image src={Chrome} alt="elgato"/>
                            </div>
                            <div className="download-text">
                                <span>Install the extension</span>
                                <span>Chrome Web Store</span>
                            </div>
                        </div>
                    </a>
                    <a href=''
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
                </div>

                <h2 className="header">Compatibility</h2>

                <p>Currently this plugin works only with <strong><a href='https://beta.destinyitemmanager.com' target='_blank' rel='nofollow'>beta.destinyitemmanager.com</a></strong></p>

                <h2 className="header">Features</h2>

                <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                        <div className="embla__slide">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Equip Loadout</h3>
                                    <p>Switch Destiny 2 Loadout</p>
                                </div>
                                <ul>
                                    <li>
                                        <span>auto-sync between <strong>DIM</strong> and <strong>Elgato Stream Deck</strong></span>
                                    </li>
                                    <li>select character and loadout</li>
                                </ul>
                                <div className="action-steps">
                                    <Image src={Loadout1} alt="loadout-step-1"/>
                                    <span style={{height: 16}}/>
                                    <Image src={Loadout2} alt="loadout-step-2"/>
                                </div>
                            </div>
                        </div>
                        <div className="embla__slide">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Search</h3>
                                    <p>Execute custom search</p>
                                </div>
                                <ul>
                                    <li><span>custom query like <code>is:rocketlauncher is:void</code></span></li>
                                </ul>
                                <div className="action-steps">
                                    <Image src={Search} alt="search-step"/>
                                </div>
                            </div>
                        </div>
                        <div className="embla__slide">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Vault</h3>
                                    <p>Show a specific param from the vault</p>
                                </div>
                                <ul>
                                    <li>vault items</li>
                                    <li>glimmer</li>
                                    <li>legendary shards</li>
                                    <li>bright dust</li>
                                </ul>
                                <div className="action-steps">
                                    <Image src={Vault} alt="vault-step"/>
                                </div>
                            </div>
                        </div>
                        <div className="embla__slide">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Refresh</h3>
                                    <p>Execute a refresh action in DIM</p>
                                </div>
                                <ul>
                                    <li>Click on <Image src={Refresh} alt="refresh"/></li>
                                </ul>
                            </div>
                        </div>
                        <div className="embla__slide">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Postmaster</h3>
                                    <p>Show some postmaster's stats</p>
                                </div>
                                <ul>
                                    <li><span>2 styles: <code>percentage</code> , <code>counter</code></span></li>
                                    <li><span><code>Ascendant Shards</code> counter</span></li>
                                    <li><span><code>Enhancement Prisms</code> counter</span></li>
                                    <li><span><code>Spoils of Conquer</code> counter</span></li>
                                </ul>
                                <div className="action-steps">
                                    <Image src={Postmaster1} alt="postmaster-step-1"/>
                                    <span style={{height: 16}}/>
                                    <Image src={Postmaster2} alt="postmaster-step-2"/>
                                </div>
                            </div>
                        </div>

                        <div className="embla__slide">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Metrics</h3>
                                    <p>Show in-game metrics</p>
                                </div>
                                <ul>
                                    <li>Battle Pass Level</li>
                                    <li>Vanguard Progression</li>
                                    <li>Gambit Progression</li>
                                    <li>Crucible Progression</li>
                                    <li>Trials Progression</li>
                                </ul>
                                <div className="action-steps">
                                    <Image src={Metrics} alt="metrics-step"/>
                                </div>
                            </div>
                        </div>

                        <div className="embla__slide">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Open DIM</h3>
                                    <p>Open a specific version of destinyitemmanager.com</p>
                                </div>
                                <ul>
                                    <li><span>Launch the <code>stable</code> or <code>beta</code> version</span></li>
                                </ul>
                                <div className="action-steps">
                                    <Image src={AppPi} alt="randomize-step"/>
                                </div>
                            </div>
                        </div>
                        <div className="embla__slide">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Randomize Character</h3>
                                    <p>Randomize a specific character</p>
                                </div>
                                <ul>
                                    <li>As the title says 😆</li>
                                </ul>
                                <div className="action-steps">
                                    <Image src={Randomize} alt="randomize-step"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="header">In-app Preview</h2>

                <div style={{marginTop: 16}}>
                    <Image alt="preview" src={Preview}/>
                </div>

                <div style={{marginTop: 16}}>
                    <Image alt="preview1" src={Preview1}/>
                </div>

            </main>

            <style jsx>{`
              .container {
                min-height: 100vh;
                padding: 0 0.5rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }

              .action-steps {
                display: flex;
                flex-direction: column;
                margin: auto 16px;
                padding-top: 16px;
              }

              main {
                padding: 5rem 0;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }

              footer {
                width: 100%;
                height: 100px;
                border-top: 1px solid #eaeaea;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              footer img {
                margin-left: 0.5rem;
              }

              footer a {
                display: flex;
                justify-content: center;
                align-items: center;
              }

              a {
                color: inherit;
                text-decoration: none;
              }

              .installation {
                display: flex;
                width: 100%;
                justify-content: center;
              }

              .download-button {
                width: 300px;
                height: 80px;
                display: flex;
                margin-left: 8px;
                margin-right: 8px;
                align-items: center;
                background: #ccc;
                cursor: pointer;
                margin-top: 16px;
              }

              .download-button span {
                color: #181818;
              }

              .download-button.elgato span {
                color: white;
              }

              .download-icon {
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .elgato {
                background: #0f1c7c;
              }

              .here {
                background: #0bacec;
              }

              .download-button > div:first-of-type {
                height: 100%;
                min-width: 80px;
                background: rgba(0, 0, 0, .8);
                margin-right: 16px;
              }

              .download-button > div:last-of-type {
                display: flex;
                flex-direction: column;
              }

              .download-button div > span:first-of-type {
                font-size: 1.1rem;
                font-weight: bold;
              }

              .download-button div > span:last-of-type {
                opacity: .8;
                margin-top: 4px;
                font-size: 1rem;
              }

              .download-button img {
                width: calc(100% - 32px);
              }

              .header {
                width: 100%;
                padding: 16px 8px;
                border-bottom: 1px solid rgba(255, 255, 255, .2);
              }

              .github-button {
                padding: 8px;
                display: flex;
                align-items: center;
                font-weight: bold;
                border-radius: 4px;
                background: rgb(235, 235, 235);
                border: 1px solid #ccc;
                margin-top: 16px;
                background: linear-gradient(90deg, rgba(235, 235, 235, 1) 0%, rgba(248, 248, 248, 1) 100%);
              }

              .github-button span {
                color: #212121;
                flex: 1;
                text-align: center;
                margin-left: 8px;
              }

              .title {
                margin: 0;
                line-height: 1.15;
                font-size: 4rem;
              }

              .title,
              .description {
                text-align: center;
              }

              .description {
                line-height: 1.5;
                font-size: 1.5rem;
              }

              .card {
                margin: 1rem;
                color: inherit;
                height: 100%;
                text-decoration: none;
                background: rgba(0, 0, 0, .9);
                transition: color 0.15s ease, border-color 0.15s ease;
                justify-content: start;
              }

              .card ul {
                padding: 0;
                background: #333333;
                margin-top: 16px;
                margin-bottom: 0;
              }

              .card li {
                margin: 0 16px;
                display: flex;
                align-items: center;
                list-style: none;
                padding: 8px;
              }

              .card li img {
                margin-left: 8px;
              }

              .card li:not(li:last-of-type) {
                border-bottom: 1px solid rgba(255, 255, 255, .3);
              }

              .card-header {
                padding: 16px;
                background: #513065 url(${masterwork.src}) repeat-x;
                background-position-y: top;
              }

              .card-header h3 {
                padding: 0;
                margin: 0 0 0.3rem 0;
                font-size: 1.4rem;
              }

              code {
                background: black;
                padding: 4px;
              }

              .card-header p {
                padding: 0;
                opacity: .7;
                font-size: 1.04rem;
                margin: 0;
              }

              .card:hover,
              .card:focus,
              .card:active {
                background: rgba(0, 0, 0, .6);
              }

              .embla {
                overflow: hidden;
                position: relative;
                padding: 20px;
                max-width: 80%;
                margin-left: auto;
                margin-right: auto;
              }

              .embla__viewport {
                overflow: hidden;
                width: 100%;
              }

              .embla__viewport.is-draggable {
                cursor: move;
                cursor: grab;
              }

              .embla__viewport.is-dragging {
                cursor: grabbing;
              }

              .embla__container {
                display: flex;
                user-select: none;
                -webkit-touch-callout: none;
                -khtml-user-select: none;
                -webkit-tap-highlight-color: transparent;
                margin-left: -10px;
              }

              .embla__slide {
                position: relative;
                flex: 0 0 450px;
              }

              .embla__slide__inner {
                position: relative;
                overflow: hidden;
                height: 190px;
              }

              .embla__slide__img {
                position: absolute;
                display: block;
                top: 50%;
                left: 50%;
                width: auto;
                min-height: 100%;
                min-width: 100%;
                max-width: none;
                transform: translate(-50%, -50%);
              }

              .embla__button {
                outline: 0;
                cursor: pointer;
                background-color: transparent;
                touch-action: manipulation;
                position: absolute;
                z-index: 1;
                top: 50%;
                transform: translateY(-50%);
                border: 0;
                width: 30px;
                height: 30px;
                justify-content: center;
                align-items: center;
                fill: #1bcacd;
                padding: 0;
              }

              .embla__button:disabled {
                cursor: default;
                opacity: 0.3;
              }

              .embla__button__svg {
                width: 100%;
                height: 100%;
              }

              .embla__button--prev {
                left: 27px;
              }

              .embla__button--next {
                right: 27px;
              }


              @media (max-width: 600px) {
                .grid {
                  width: 100%;
                  flex-direction: column;
                }
              }
            `}</style>

            <style jsx global>{`
              html,
              body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
              }

              body {
                background: radial-gradient(circle, rgba(33, 33, 33, 1) 0%, rgba(0, 0, 0, 1) 100%);
              }

              ::-webkit-scrollbar {
                width: 10px;
              }

              ::-webkit-scrollbar-track {
                background: #181818;
              }

              ::-webkit-scrollbar-thumb {
                background: #404040;
              }

              ::-webkit-scrollbar-thumb:hover {
                background: #404040;
              }

              * {
                box-sizing: border-box;
                color: white;
              }
            `}</style>
        </div>
    )
}
