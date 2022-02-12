let ws, registerEvent, info, init;

const state = {};

const emitEvent = (eventName, data = {}) => {
    const event = new Event(eventName);
    Object.assign(event, state);
    Object.assign(event, data);
    document.dispatchEvent(event);
}

const waitForConnection = (callback) => {
    if (ws.readyState === 1) {
        callback();
    } else {
        setTimeout(() => waitForConnection(callback), 500);
    }
};

const send = (value) => {
    waitForConnection(() => {
        ws.send(JSON.stringify(value));
    });
}

const sendToPlugin = (payload) => {
    send({
        'action': state.action, 'event': 'sendToPlugin', 'context': state.uuid, 'payload': payload
    });
}

const checkInit = () => {
    if (init || !state.settings || !state.pluginSettings) return;
    init = true;
    console.log(state);
    emitEvent('init');
}

const initPropertyInspector = () => {

    ws.onopen = () => {
        send({
            event: registerEvent, uuid: state.uuid
        });
        send({
            event: "getSettings", context: state.uuid
        });
        send({
            event: "getGlobalSettings", context: state.uuid
        });
    }

    const STATE_KEYS = {
        didReceiveSettings: 'settings', didReceiveGlobalSettings: 'pluginSettings',
    }

    ws.onmessage = ({data}) => {

        const {event, payload} = JSON.parse(data);

        switch (event) {
            case 'didReceiveSettings':
            case 'didReceiveGlobalSettings':
                const changed = STATE_KEYS[event];
                state[changed] = payload.settings || {};
                applySettings();
                checkInit();
                emitEvent('stateChange', {...state, changed});
                break;
            case 'sendToPropertyInspector':
                emitEvent('messageFromPlugin', {...state, message: payload});
                break;
            default:
                emitEvent(event, state);
        }
    }
}

const setLocalSettings = (payload) => {
    console.log("Saving settings...", payload);
    state.settings = payload;
    emitEvent('stateChange', {...state, changed: "settings"});
    send({event: "setSettings", context: state.uuid, payload});
}

/* based on code (https://github.com/BarRaider/streamdeck-easypi) */
const applySettings = () => {
    const payload = state.settings;
    for (const key in payload) {
        try {
            const elem = document.getElementById(key);
            if (elem.classList.contains("sdCheckbox")) { // Checkbox
                elem.checked = payload[key];
            } else if (elem.classList.contains("sdFile")) { // File
                const elemFile = document.getElementById(elem.id + "Filename");
                elemFile.innerText = payload[key];
                if (!elemFile.innerText) {
                    elemFile.innerText = "No file...";
                }
            } else if (elem.classList.contains("sdList")) { // Dynamic dropdown
                const textProperty = elem.getAttribute("sdListTextProperty");
                const valueProperty = elem.getAttribute("sdListValueProperty");
                const valueField = elem.getAttribute("sdValueField");

                const items = payload[key];
                elem.options.length = 0;

                for (let idx = 0; idx < items.length; idx++) {
                    const opt = document.createElement('option');
                    opt.value = items[idx][valueProperty];
                    opt.text = items[idx][textProperty];
                    elem.appendChild(opt);
                }
                elem.value = payload[valueField];
            } else if (elem.classList.contains("sdHTML")) { // HTML element
                elem.innerHTML = payload[key];
            } else {
                elem.value = payload[key];
            }
        } catch (err) {
            console.log("Err for key: " + key + " - " + err);
        }
    }
}

/* based on code (https://github.com/BarRaider/streamdeck-easypi) */
const setSettings = () => {
    const payload = {};
    const elements = document.getElementsByClassName("sdProperty");

    Array.prototype.forEach.call(elements, function (elem) {
        const key = elem.id;
        if (elem.classList.contains("sdCheckbox")) { // Checkbox
            payload[key] = elem.checked;
        } else if (elem.classList.contains("sdFile")) { // File
            const elemFile = document.getElementById(elem.id + "Filename");
            payload[key] = elem.value;
            if (!elem.value) {
                payload[key] = elemFile.innerText;
            } else {
                elemFile.innerText = elem.value;
            }
        } else if (elem.classList.contains("sdList")) { // Dynamic dropdown
            const valueField = elem.getAttribute("sdValueField");
            payload[valueField] = elem.value;
        } else if (elem.classList.contains("sdHTML")) { // HTML element
            const valueField = elem.getAttribute("sdValueField");
            payload[valueField] = elem.innerHTML;
        } else {
            payload[key] = elem.value;
        }
    });

    setLocalSettings(payload);

}

const setPluginSettings = (key, value = undefined) => {
    if (key && value) {
        state.pluginSettings[key] = value;
    } else {
        state.pluginSettings = key;
    }
    emitEvent('stateChange', {...state, changed: "pluginSettings"});
    send({
        event: "setGlobalSettings", context: state.uuid, payload: state.pluginSettings
    });
}

const connectElgatoStreamDeckSocket = (inPort, inUUID, inRegisterEvent, inInfo, inActionInfo) => {
    state.uuid = inUUID;
    registerEvent = inRegisterEvent;
    info = JSON.parse(inInfo);
    state.actionInfo = JSON.parse(inActionInfo);
    state.action = state.actionInfo.action;
    state.settings = state.actionInfo.settings || {};
    ws = new WebSocket('ws://127.0.0.1:' + inPort);
    initPropertyInspector();
}


