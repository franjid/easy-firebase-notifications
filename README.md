# What is this?

Just a basic "library" to send notifications messages through Firebase

## What do you need

First of all, you need to sign up on [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging).

Then, set up a [project and service account](https://firebase.google.com/docs/admin/setup#set-up-project-and-service-account).

Save you `PROJECT_ID` key and your `service-account.json` file as you will need them later. 

## Example

I've included an [example on how to use the library](usageExample.js).

Remember to init the lib with your `PROJECT_ID` and the path to `service-account.json`.

Run:
```
node usageExample.js
```

And have fun sending your awesome notifications!
