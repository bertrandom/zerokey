const InputEvent = require('input-event');
const rp = require('request-promise-native');
const config = require('config');
const input = new InputEvent('/dev/input/event0');
const keyboard = new InputEvent.Keyboard(input);

console.log('zerokey started');

keyboard.on('keypress', async (e) => {
    if (e.value === 1) {

        let response = null;

        console.log(e.code);

        switch (e.code) {
            case 2:

                response = await rp({
                    uri: `http://${config.hubitat.host}/apps/api/88/devices/36?access_token=${config.hubitat.access_token}`,
                    json: true
                });

                if (response && (response.attributes[0]?.currentValue === 'on' || response.attributes[1]?.currentValue === 'on')) {
                    console.log('turn off lights');
                    rp(`http://${config.hubitat.host}/apps/api/88/devices/36/off?access_token=${config.hubitat.access_token}`);
                } else {
                    console.log('turn on lights');
                    rp(`http://${config.hubitat.host}/apps/api/88/devices/36/on?access_token=${config.hubitat.access_token}`);
                }

                break;

            case 4:
                response = await rp({
                    uri: `http://${config.hubitat.host}/apps/api/88/devices/110?access_token=${config.hubitat.access_token}`,
                    json: true
                });

                levelAttribute = null;

                if (response && response.attributes[0]?.name == 'level') {
                    levelAttribute = response.attributes[0];
                } else if (response && response.attributes[1]?.name == 'level') {
                    levelAttribute = response.attributes[1];
                }

                console.log('current level', levelAttribute);

                if (levelAttribute) {
                    switch (levelAttribute.currentValue) {
                        case 1:
                        default:
                            rp(`http://${config.hubitat.host}/apps/api/88/devices/110/setLevel/50?access_token=${config.hubitat.access_token}`);
                            break;

                        case 20:
                            rp(`http://${config.hubitat.host}/apps/api/88/devices/110/setLevel/1?access_token=${config.hubitat.access_token}`);
                            break;

                        case 50:
                            rp(`http://${config.hubitat.host}/apps/api/88/devices/110/setLevel/20?access_token=${config.hubitat.access_token}`);
                            break;

                    }
                }


        }
    }
});