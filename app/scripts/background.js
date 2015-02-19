/* exported loggedIn */

'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

// Sets a badge for the app - like a notification
//chrome.browserAction.setBadgeText({text: '\'Allo'});

var loggedIn = true;

/*
chrome.browserAction.setBadgeText({text: 'Yay!'});

var opt = {
  type: 'basic',
  title: 'Here is a notification',
  message: 'This is a test notification',
  iconUrl: 'images/icon-128.png'
};

Then show the notification.
chrome.notifications.create('abc', opt, function() {
  console.error(chrome.runtime.lastError);
});
*/

console.log('\'Allo \'Allo! Event Page for Browser Action');
