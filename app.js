const InputEvent = require('input-event');
const rp = require('request-promise-native');
const config = require('config');
const input = new InputEvent('/dev/input/event0');
const keyboard = new InputEvent.Keyboard(input);
const { exec } = require("child_process");

console.log('zerokey started');

keyboard.on('keypress', (e) => {
    if (e.value === 1) {
        switch (e.code) {
            case 2:
                console.log('switching input to mac');
                exec("/usr/bin/ddcutil setvcp 60 0x10");
                break;
            case 3:
                console.log('switching input to pc');
                exec("/usr/bin/ddcutil setvcp 60 0x0f");
                break;
            case 4:
                console.log('switching input to hdmi1');
                exec("/usr/bin/ddcutil setvcp 60 0x11");
                break;
        }
    }
});