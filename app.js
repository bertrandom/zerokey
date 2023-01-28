const InputEvent = require('input-event');
const rp = require('request-promise-native');
const config = require('config');
const input = new InputEvent('/dev/input/event0');
const keyboard = new InputEvent.Keyboard(input);

console.log('zerokey started');

keyboard.on('keypress', async (e) => {
    if (e.value === 1) {
        switch (e.code) {
            case 2:

                const response = await rp({
                    uri: `http://${config.hubitat.host}/apps/api/88/devices/36?access_token=${config.hubitat.access_token}`,
                    json: true
                });

                if (response && response.attributes[1]?.currentValue === 'on') {
                    console.log('turn off lights');
                    rp(`http://${config.hubitat.host}/apps/api/88/devices/36/off?access_token=${config.hubitat.access_token}`);
                } else {
                    console.log('turn on lights');
                    rp(`http://${config.hubitat.host}/apps/api/88/devices/36/on?access_token=${config.hubitat.access_token}`);
                }

                break;

        }
    }
});