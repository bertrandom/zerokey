const InputEvent = require('input-event');
const rp = require('request-promise-native');
const config = require('config');
const input = new InputEvent('/dev/input/event0');
const keyboard = new InputEvent.Keyboard(input);

const input2 = new InputEvent('/dev/input/event1');
const keyboard2 = new InputEvent.Keyboard(input2);

console.log('zerokey started');

const os = require("os");
const hostname = os.hostname();

const handleKeypress = async (e) => {
    if (e.value === 1) {

        if (!config.codes[e.code.toString()]) {
            console.log('unknown key', e.code);
            return;
        }


        key = config.codes[e.code.toString()]

        body = {
            client_id: hostname,
            key: key
        };

        console.log(body);

        response = await rp({
            uri: `http://${config.nexus.host}/key/press`,
            method: 'POST',
            json: true,
            body: body,
        });

    }
}

keyboard.on('keypress', handleKeypress);
keyboard2.on('keypress', handleKeypress);