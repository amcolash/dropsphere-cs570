/* global $ */

'use strict';

console.log('\'Allo \'Allo! Popup');

var background = chrome.extension.getBackgroundPage();

if (!background.loggedIn) {
  $('#login').show();
} else {
  $('#feed').show();
}

$('form').submit(function() {
  event.preventDefault();
  console.log('trying to submit!');
  var valid = true;
  $('input').each(function () {
    if (!$(this).val()) {
      valid = false;
      console.log('invalid, ' + this);
    }
  });

  if (valid) {
    $('#login').hide();
    $('#feed').show();
  }
});
