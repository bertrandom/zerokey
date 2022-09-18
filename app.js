const InputEvent = require('input-event');
const rp = require('request-promise-native');
const config = require('config');
const input = new InputEvent('/dev/input/event0');
const keyboard = new InputEvent.Keyboard(input);

console.log('zerokey started');

keyboard.on('keypress', (e) => {
    if (e.value === 1) {
        switch (e.code) {
            case 2:
                rp(`http://${config.hubitat.host}/apps/api/88/devices/36/setLevel/100?access_token=${config.hubitat.access_token}`);
                console.log('turn on lights');
                break;
            case 3:
                rp(`http://${config.hubitat.host}/apps/api/88/devices/36/setLevel/25?access_token=${config.hubitat.access_token}`);
                console.log('set lights to 25%');
                break;
            case 4:
                console.log('turn off lights');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/36/off?access_token=${config.hubitat.access_token}`);
                break;
            case 5:
                console.log('open blinds');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/68/open?access_token=${config.hubitat.access_token}`);
                rp(`http://${config.hubitat.host}/apps/api/88/devices/69/open?access_token=${config.hubitat.access_token}`);
                rp(`http://${config.hubitat.host}/apps/api/88/devices/70/open?access_token=${config.hubitat.access_token}`);
                rp(`http://${config.hubitat.host}/apps/api/88/devices/71/open?access_token=${config.hubitat.access_token}`);
                rp(`http://${config.hubitat.host}/apps/api/88/devices/72/open?access_token=${config.hubitat.access_token}`);
                break;
            case 6:
                console.log('open blinds to 50%');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/68/setLevel/50?access_token=${config.hubitat.access_token}`);
                rp(`http://${config.hubitat.host}/apps/api/88/devices/69/setLevel/50?access_token=${config.hubitat.access_token}`);
                rp(`http://${config.hubitat.host}/apps/api/88/devices/70/setLevel/50?access_token=${config.hubitat.access_token}`);
                rp(`http://${config.hubitat.host}/apps/api/88/devices/71/setLevel/50?access_token=${config.hubitat.access_token}`);
                rp(`http://${config.hubitat.host}/apps/api/88/devices/72/setLevel/50?access_token=${config.hubitat.access_token}`);
                break;
            case 7:
                console.log('close blinds');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/68/close?access_token=${config.hubitat.access_token}`);
                rp(`http://${config.hubitat.host}/apps/api/88/devices/69/close?access_token=${config.hubitat.access_token}`);
                rp(`http://${config.hubitat.host}/apps/api/88/devices/70/close?access_token=${config.hubitat.access_token}`);
                rp(`http://${config.hubitat.host}/apps/api/88/devices/71/close?access_token=${config.hubitat.access_token}`);
                rp(`http://${config.hubitat.host}/apps/api/88/devices/72/close?access_token=${config.hubitat.access_token}`);
                break;

        }
    }
});