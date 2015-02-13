/* exported loggedIn */

'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

// Sets a badge for the app - like a notification
//chrome.browserAction.setBadgeText({text: '\'Allo'});

var i = 0;

var loggedIn = true;

var interval;

function abc() {
  chrome.browserAction.setBadgeText({text: '' + i});
  i = (i + 1);

  if (i > 10) {
    clearInterval(interval);
    //loggedIn = true;
  }
}

abc();

interval = setInterval(abc, 1000);

console.log('\'Allo \'Allo! Event Page for Browser Action');
