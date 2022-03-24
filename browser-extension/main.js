const GLIMMER = "36dd52a3005cb28f7f68448f1ab76c1e";
const SHARDS = "1ff4a008cb851794ccb588e4eb3918a1";
const BRIGHT_DUST = "00b8fd588be5678ad3f94d75dc6a3b19";

let socket;

const extractLoadout = async () => {

    const loadouts = {};

    $('div.character:not(.vault)').each((i, character) => {

        $(character).trigger("click");

        const characterInfo =  $('div:nth-child(1) > div:last-of-type', character);
        const clazz = $('> div:first-of-type > div:first-of-type', characterInfo).text();
        const race = $('> div:last-of-type', characterInfo).text();

        loadouts[`${clazz} (${race})`] =
            $('.loadout-menu li:has(a)')
                .nextAll('li:has(span)').map((i, e) => $('span:first', $(e)).attr('title'))
                .toArray();

        $(character).trigger("click");

    });

    socket.send(JSON.stringify({loadouts}));

}

const fractionToDecimal = value => {
    if (value.includes('⁄')) {
        const [base, fraction] = value.split(' ');
        const [c, t] = value.split(' ')[1].split('⁄');
        return `${base}${(c / t).toFixed(2).slice(1)}`;
    }
    return value;
}

const extractMaxPower = async () => {
    const [total, base, artifact] = $('.store-cell:has(.character.current) .powerStat').toArray().map(it => $(it).text());
    socket.send(JSON.stringify({
        maxPower: {
            total: fractionToDecimal(total),
            base: fractionToDecimal(base),
            artifact: artifact,
        }
    }));
}

const extractVault = async () => {
    try {
        const vault = $(".vault div:has(img) + div:contains(500)").text() || "";
        const glimmer = $(`.vault img[src*=${GLIMMER}] + div`).text() || "";
        const shards = $(`.vault img[src*=${SHARDS}] + div`).text() || "";
        const brightDust = $(`.vault img[src*=${BRIGHT_DUST}] + div`).text() || "";

        if(!glimmer && !shards && !brightDust) {
            return;
        }

        socket.send(JSON.stringify({
            vault: {
                vault: vault.split('/')[0],
                glimmer,
                shards,
                brightDust
            }
        }));
    } catch (e) {
        // not in /inventory page maybe ?
    }
}

const sendFarmingModeState = () => {
    const farmingDialog = $('.d2-farming');
    socket.send(JSON.stringify({
        farmingMode: farmingDialog.length > 0
    }));
}

const clickCurrent = async () => {
    $(`div.character.current`).trigger("click");
    await delay(200);
}

const onMessage = async (event) => {

    const {action, args = {}} = JSON.parse(event.data);
    const {character, loadout, search} = args;

    const [clazz, race] = character?.replace(/[()]/g, '')?.split(' ') || [];

    const clickCharacter = async () => {
        $(`div.character:contains(${clazz}):contains(${race})`).trigger("click");
        await delay(200);
    }

    switch (action) {

        case "loadout":
            await clickCharacter();
            $(`span[title="${loadout}"]`).trigger("click");
            break

        case "maxPower":
            await clickCurrent();
            $('span:has(svg[data-icon="dimPower"])').trigger("click");
            break

        case "farmingMode":
            const exist = $('.d2-farming');
            if (exist.length) {
                $('button', exist).trigger("click");
            } else {
                await clickCurrent();
                $('span:has(svg[data-icon="dimEngram"])').trigger("click");
            }
            await delay(500);
            sendFarmingModeState();
            break

        case "refresh":
            $(`a[role="button"] span.fa-sync`).trigger("click");
            break

        case "collectPostmaster":
            const index = $(`div.character`).toArray().map(it => $(it).attr('class')).findIndex(it => it.includes('current'));
            const button = $(`.store-row:has(.dim-button) .store-cell:nth-child(${index + 1}) .dim-button`);
            $(button).click();
            await delay(500);
            $('div', button).click();
            break;

        case "randomize":
            await clickCharacter();
            await delay()
            $(`li span.fa-random`).trigger("click");
            break

        case "search":
            const element = document.querySelector('input[name="filter"]');
            const ev = new Event('input', {bubbles: true});
            ev.simulated = true;
            element.value = search;
            element.dispatchEvent(ev);
            break

    }

};

const sendBungieId = async () => {
    const {bungieMembershipId} = JSON.parse(localStorage.getItem("authorization"));
    const res = await fetch(`https://www.bungie.net/Platform/Destiny2/254/Profile/${bungieMembershipId}/LinkedProfiles/?getAllMemberships=true`, {
        headers: {
            "x-api-key": window.location.href.includes('beta') ? "2b16c291fcff48cbac86bd5f1d0bbc9d" : "5ec01caf6aee450d9dabe646294ffdc9"
        }
    });
    const body = await res.json();
    socket.send(JSON.stringify({
        membershipId: localStorage.getItem("dim-last-membership-id"),
        membershipType: body["Response"]["profiles"][0]["crossSaveOverride"]
    }));
}


const onOpen = () => {
    onDimReady().then(() => {
        try {
            sendBungieId().then();
            extractMaxPower().then();
            extractLoadout().then();
            extractVault().then();
            setInterval(extractVault, 1000 * 30);
            setInterval(extractMaxPower, 1000 * 30);
            setInterval(sendFarmingModeState, 1000 * 10);
        } catch (e) {
            console.log(e);
        }
    });
}

const startWebsocket = () => {
    socket = new WebSocket('ws://localhost:9119');
    socket.onmessage = onMessage;
    socket.onopen = onOpen;
    socket.onclose = () => {
        socket = null;
        setTimeout(startWebsocket, 1000);
    }
}

startWebsocket();
