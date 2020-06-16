const notifications = require(__dirname + '/index.js');

const NOTIFICATIONS_PROJECT_ID = 'your-firebase-project-id';
const NOTIFICATIONS_SERVICE_ACCOUNT = 'path-to-service-account.json';

function buildMessage(token) {
  return {
    'message': {
      'token': token,
      'notification': {
        'title': 'Some awesome notification title!',
        'body': 'Hey, you see? I can send notifications to your device. Magic'
      }
    }
  };
}

const token = 'some-registered-token-to-send-notification';

notifications.init(NOTIFICATIONS_PROJECT_ID, NOTIFICATIONS_SERVICE_ACCOUNT).then(() => {
  notifications.sendMessage(buildMessage(token)).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });
});
