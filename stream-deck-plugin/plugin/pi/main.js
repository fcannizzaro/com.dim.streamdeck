let character = document.getElementById('character');
let loadout = document.getElementById('loadout');
let loadoutField = document.getElementById('loadout-field');

let prevSettings = {};
let loadouts = {};

// reset select field
const emptySelect = (select) => {
    for (const item in select.options) {
        select.options.remove(0);
    }
    select.options.add(new Option('', ''))
}

// initialize character field
const dimInit = async () => {
    if (character) {
        Object.entries(loadouts).forEach(([id, {label}]) => character.options.add(new Option(label, id)));
        character.value = prevSettings["character"];
    }
    if (loadout) {
        initLoadouts();
        loadout.value = prevSettings["loadout"];
    }
}

// initialize loadout field
const initLoadouts = () => {
    emptySelect(loadout);

    if (loadouts[character.value]) {
        loadoutField.classList.remove("hidden");
        loadouts[character.value]?.items?.forEach(it => loadout.options.add(new Option(it.label, it.id)));
    } else {
        loadoutField.classList.add("hidden");
    }
}


const showHideDimConnectionBanner = (visible) => {
    document.getElementById('error-extension').className = visible ? "" : 'hidden';
}

document.addEventListener('init', async ({settings, pluginSettings, action}) => {

    showHideDimConnectionBanner(!Object.keys(pluginSettings || {}).length);

    // show the actions settings block
    const actionPI = document.getElementById(action);
    if (actionPI) {
        actionPI.className = "";
    }

    // destroy other actions
    Array.from(document.querySelectorAll('.isAction.hidden')).forEach(e => e.parentNode.removeChild(e));

    // assign fields
    character = document.getElementById('character');
    loadout = document.getElementById('loadout');
    loadoutField = document.getElementById('loadout-field');

    // init variables
    loadouts = pluginSettings.loadouts;
    prevSettings = settings;
    await dimInit();
});

document.addEventListener('stateChange', async ({changed, settings, pluginSettings, action}) => {

    showHideDimConnectionBanner(!Object.keys(pluginSettings || {}).length);

    if (changed === 'settings') {
        // character.value = settings["character"];
        // loadout.value = settings["loadout"];
        if (action.endsWith('loadout') && character.value !== prevSettings["character"]) {
            initLoadouts();
        }
        prevSettings = settings;
    }
});

