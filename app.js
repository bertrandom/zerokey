const InputEvent = require('input-event');
const rp = require('request-promise-native');
const config = require('config');
const input = new InputEvent('/dev/input/event0');
const keyboard = new InputEvent.Keyboard(input);

console.log('zerokey started');

keyboard.on('keypress', async (e) => {
    if (e.value === 1) {

        let response = null;

        switch (e.code) {
            case 2:

                response = await rp({
                    uri: `http://${config.hubitat.host}/apps/api/88/devices/36?access_token=${config.hubitat.access_token}`,
                    json: true
                });

                levelAttribute = null
                for (let attribute of response.attributes) {
                    if (attribute.name === 'level') {
                        levelAttribute = attribute;
                    }
                }

                switchAttribute = null
                for (let attribute of response.attributes) {
                    if (attribute.name === 'switch') {
                        switchAttribute = attribute;
                    }
                }

                console.log('current level', levelAttribute);
                console.log('current switch', switchAttribute);

                if (switchAttribute.currentValue == 'off') {
                    // rp(`http://${config.hubitat.host}/apps/api/88/devices/36/on?access_token=${config.hubitat.access_token}`);
                    rp(`http://${config.hubitat.host}/apps/api/88/devices/36/setLevel/25?access_token=${config.hubitat.access_token}`);
                } else {
                    // if (levelAttribute.currentValue == 25) {
                    //     rp(`http://${config.hubitat.host}/apps/api/88/devices/36/setLevel/100?access_token=${config.hubitat.access_token}`);
                    // } else {
                        rp(`http://${config.hubitat.host}/apps/api/88/devices/36/off?access_token=${config.hubitat.access_token}`);
                    // }
                }

                break;

            case 3:
                response = await rp({
                    uri: `http://${config.hubitat.host}/apps/api/88/devices/74?access_token=${config.hubitat.access_token}`,
                    json: true
                });

                levelAttribute = null
                for (let attribute of response.attributes) {
                    if (attribute.name === 'level') {
                        levelAttribute = attribute;
                    }
                }

                switchAttribute = null
                for (let attribute of response.attributes) {
                    if (attribute.name === 'switch') {
                        switchAttribute = attribute;
                    }
                }

                if (switchAttribute.currentValue == 'off') {
                    console.log('open blinds');
                    rp(`http://${config.hubitat.host}/apps/api/88/devices/74/setLevel/100?access_token=${config.hubitat.access_token}`);
                } else {
                    console.log('close blinds');
                    rp(`http://${config.hubitat.host}/apps/api/88/devices/74/setLevel/0?access_token=${config.hubitat.access_token}`);
                }

                break;

            case 4:
                console.log('toggling egypt light');
                response = await rp({
                    uri: "http://homeassistant.smittn.com:8123/api/webhook/toggle-egypt-light-bZL3bzlROmU0QuF7Bmhns_Zl",
                    method: 'POST',
                });
                break;

            case 5:
                console.log('setting sconce to 50%');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/110/setLevel/50?access_token=${config.hubitat.access_token}`);
                break;
            case 6:
                console.log('setting sconce to 20%');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/110/setLevel/20?access_token=${config.hubitat.access_token}`);
                break;
            case 7:
                console.log('setting sconce to 1%');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/110/setLevel/1?access_token=${config.hubitat.access_token}`);
                break;

        }
    }
});