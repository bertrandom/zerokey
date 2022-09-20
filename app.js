const InputEvent = require('input-event');
const rp = require('request-promise-native');
const config = require('config');
const input = new InputEvent('/dev/input/event0');
const keyboard = new InputEvent.Keyboard(input);

console.log('zerokey started');

let storedAccessToken = null;

const getAccessToken = async () => {
    const now = Math.floor(Date.now() / 1000);

    if (storedAccessToken == null || storedAccessToken.expires >= now) {
        
        const response = await rp({
            uri: "https://api.sonos.com/login/v3/oauth/access",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + Buffer.from(config.sonos.client_id + ':' + config.sonos.client_secret).toString('base64')
            },
            form: {
                grant_type: "refresh_token",
                refresh_token: config.sonos.refresh_token,
            }
        });

        if (response) {
            const body = JSON.parse(response);

            storedAccessToken = body;
            storedAccessToken.expires = now + storedAccessToken.expires;

            return storedAccessToken.access_token;
        }

    } else {

        return storedAccessToken.access_token;

    }
}

keyboard.on('keypress', async (e) => {

    let accessToken = null;
    let response = null;

    if (e.value === 1) {

        switch (e.code) {
            case 2:

                console.log('switch sonos input to record player');

                accessToken = await getAccessToken();
                response = await rp({
                    uri: "https://api.ws.sonos.com/control/api/v1/groups/RINCON_48A6B8033D6501400:2733352432/playback/lineIn",
                    method: "POST",
                    json: true,
                    body: {
                        "deviceId": "RINCON_48A6B8214BA201400"
                    },
                    headers: {
                        "Authorization": "Bearer " + accessToken,
                    }
                });
                console.log(response);
                break;

            case 3:
                console.log('switch sonos input to TV');                

                accessToken = await getAccessToken();
                response = await rp({
                    uri: "https://api.ws.sonos.com/control/api/v1/players/RINCON_48A6B8033D6501400/homeTheater",
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + accessToken,
                        "Content-Type": "application/json"
                    },
                    body: "{}",
                });
                console.log(response);
                break;
        }

    }
});