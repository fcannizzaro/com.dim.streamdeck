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
        Object.keys(loadouts).forEach(it => character.options.add(new Option(it, it)));
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
    if ((loadouts[character.value] || []).length) {
        loadoutField.classList.remove("hidden");
        loadouts[character.value].forEach(it => loadout.options.add(new Option(it, it)));
    } else {
        loadoutField.classList.add("hidden");
    }
}

document.addEventListener('init', async ({settings, pluginSettings, action}) => {

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
    console.log(pluginSettings);
    loadouts = pluginSettings.loadouts;
    prevSettings = settings;
    await dimInit();
});

document.addEventListener('stateChange', async ({changed, settings, pluginSettings, action}) => {
    if (changed === 'settings') {
        // character.value = settings["character"];
        // loadout.value = settings["loadout"];
        if (action.endsWith('loadout') && character.value !== prevSettings["character"]) {
            initLoadouts();
        }
        prevSettings = settings;
    }
});

