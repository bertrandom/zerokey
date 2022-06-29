const InputEvent = require('input-event');
const rp = require('request-promise-native');
const config = require('config');
const input = new InputEvent('/dev/input/event0');
const keyboard = new InputEvent.Keyboard(input);

console.log('zerokey started');

keyboard.on('keypress', (e) => {
    if (e.value === 1) {
        switch (e.code) {
            case 71:
                console.log('turn on lights');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/7/setLevel/100?access_token=${config.hubitat.access_token}`);
                break;
            case 72:
                console.log('set lights to 25%');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/7/setLevel/25?access_token=${config.hubitat.access_token}`);
                break;
            case 73:
                console.log('turn off lights');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/7/off?access_token=${config.hubitat.access_token}`);
                break;
            case 75:
                console.log('open blinds');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/8/open?access_token=${config.hubitat.access_token}`);
                break;
            case 76:
                console.log('open blinds to 50%');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/8/setLevel/50?access_token=${config.hubitat.access_token}`);
                break;
            case 77:
                console.log('close blinds');
                rp(`http://${config.hubitat.host}/apps/api/88/devices/8/close?access_token=${config.hubitat.access_token}`);
                break;
            case 79:
                console.log('7');
                break;
            case 80:
                console.log('8');
                break;
            case 81:
                console.log('9');
                break;
            case 82:
                console.log('0');
                break;
        }
    }
});