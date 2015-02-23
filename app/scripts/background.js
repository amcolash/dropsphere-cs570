/* exported loggedIn */

'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

// Sets a badge for the app - like a notification
//chrome.browserAction.setBadgeText({text: '\'Allo'});

var loggedIn = false;
var contacts;
var storedChats = {};
var currentConvo;



/*
var socket = io.connect('http://localhost:5000/');

socket.on('connect', function () {
    console.log("Conntect to server created");
    socket.emit('getSpheres');
});

socket.on('sphereNames', function(names){
	contacts = names;
	currentConvo = names[0];

	// add key value pairs for each name and it's chat
	names.forEach(function(name){
		storedChats[name] = [];  	// change this to get actual data
	});
});

function sendMsg(value){
	socket.emit("message", value);
} */


function initializeContacts(contacts){
	currentConvo = contacts[0];
	
	contacts.forEach(function(contact){
		storedChats[contact] = [];  	
	});
}

function getConvo(name){
	// switch the key to convo with new name if exists
	if(name){currentConvo = name;}

	//  returns the messages for given user/group
	return storedChats[currentConvo]
}


function storeMessage(msg){
	storedChats[currentConvo].push(msg);
}



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

//console.log('\'Allo \'Allo! Event Page for Browser Action');
