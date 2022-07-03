First, thank you for contributing to DIM Stream Deck!

## Developer Quick start

1. [Install Pre-requisites](#pre-requisites)
2. [Clone](#clone-the-repo)
3. [Install the stream-deck cli](#install-the-stream-deck-cli)
4. [Run and Develop](#run-and-develop)
5. [Build](#build)

### Pre-requisites

* Install [Git](https://git-scm.com/downloads)
* Install [NodeJS](https://nodejs.org/).
* Install [Yarn](https://yarnpkg.com/en/docs/install). If you're used to NPM, see "[Migrating from NPM](https://yarnpkg.com/lang/en/docs/migrating-from-npm/)".
* Windows-based developers will need to install `windows-build-tools` (`yarn global add windows-build-tools`) globally prior to build the plugin package.

### Clone the repo

To locally **run a copy** of DIM, you can simply clone the code repository:
```sh
git clone https://github.com/fcannizzaro/com.dim.streamdeck
```

To **contribute changes to the project**, you'll want to:

1. Fork DIM Stream Deck to make your own copy of the repository
2. Edit the local files
3. Commit and push your code changes to your fork
4. Create a Pull Request

More detailed information on these steps is [here](https://docs.github.com/en/get-started/quickstart/contributing-to-projects).

### Install the stream-deck cli

This CLI will simplify your development

* Run `yarn global add @stream-deck-for-node/cli`

### Run and Develop

Enter the stream-deck-plugin directory and

These operations needs to be done only one time until reverted

* Run `stream-deck link`
  > this will link your local project to the Elgato's plugins directory to live develop the plugin (symlink)
* Run `stream-deck dev`
  > this will download a develop-plugin executable ([more info](https://github.com/stream-deck-for-node/development-plugin)) that allows the Stream Deck application to use the latest code without building and restarting for every change.

You're ready, you can now test your changes using only `yarn start`.

### Notice
If you edit the `manifest.json` to add new actions, or something else you'll need to **restart** the Stream Deck application

### Build

The plugin must be linked before build

* Remember to change the CodePath to original executable paths [check here](https://github.com/fcannizzaro/com.dim.streamdeck/blob/main/stream-deck-plugin/plugin/manifest.json#L25-L27)
* Run `yarn build` / `yarn build:win` / `yarn build:mac` 
  > according to your platform
* Run `cd plugin && stream-deck package`
  > this will create a `.streamDeckPlugin` file in the current directory
