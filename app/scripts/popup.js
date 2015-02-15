/* global $ */

'use strict';

console.log('\'Allo \'Allo! Popup');

var background = chrome.extension.getBackgroundPage();

if (!background.loggedIn) {
  $('#login').show();
} else {
  $('#feed').show();
}

$('form').validator().on('submit', function (e) {
  e.preventDefault();

  background.loggedIn = true;

  $('input').each(function() {
    $(this).val('');
  });

  $('#login').hide();
  $('#feed').show();
});

$('#logout').click(function () {
  background.loggedIn = false;

  $('#login').show();
  $('#feed').hide();
});

$('#contacts li').click(function() {
  console.log(this);
  $('#contacts li').removeClass('selected');
  $(this).addClass('selected');
});
