const https = require('https');
let {google} = require('googleapis'),
  HOST = 'fcm.googleapis.com',
  MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging',
  SCOPES = [MESSAGING_SCOPE];

let PROJECT_ID,
  SERVICE_ACCOUNT,
  PATH,
  INIT_SET = false;

function getAccessToken() {
  return new Promise((resolve, reject) => {
    const key = require(SERVICE_ACCOUNT);
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );

    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(tokens.access_token);
    });
  });
}

function sendFcmMessage(fcmMessage) {
  return new Promise((resolve, reject) => {
    getAccessToken().then((accessToken) => {
      const options = {
        hostname: HOST,
        path: PATH,
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      };

      const request = https.request(options, (resp) => {
        resp.setEncoding('utf8');
        resp.on('data', (data) => {
          resolve(data);
        });
      });

      request.on('error', (err) => {
        reject(err);
      });

      request.write(JSON.stringify(fcmMessage));
      request.end();
    }, (err) => {
      reject(err);
    });
  });
}

let init = (projectId, serviceAccount) => {
  return new Promise((resolve) => {
    PROJECT_ID = projectId;
    SERVICE_ACCOUNT = serviceAccount;
    PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';

    INIT_SET = true;

    resolve(true);
  });
}

let sendMessage = (message) => {
  return new Promise((resolve, reject) => {
    if (!INIT_SET) {
      reject(Error("You need to init config values"));
      return;
    }

    sendFcmMessage(message).then((result) => {
      resolve(result);
    }, (err) => {
      reject(err);
    });
  });
};

module.exports = {
  init: init,
  sendMessage: sendMessage
};
