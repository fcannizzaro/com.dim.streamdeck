const delay = (millis) => new Promise((resolve) => setTimeout(resolve, millis));

const onDimReady = () => new Promise((resolve) => {

    let interval;

    const checkDOM = () => {
        if ($('div.character').length) {
            clearInterval(interval);
            interval = null;
            resolve();
        }
    }

    interval = setInterval(checkDOM, 500);

});
