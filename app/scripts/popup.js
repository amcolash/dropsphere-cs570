/* global $ */

'use strict';

$(function() {

  console.log('\'Allo \'Allo! Popup');

  var background = chrome.extension.getBackgroundPage();

  if(!background.loggedIn){
    $('#login').show();
  }else{
    $('#feed').show();
  }

  $('#contactList').slimScroll({
    height: '371px'
  });

  $('#chatBox').slimScroll({
    height: '337px'
  });

  $('.slimScrollBar').hide();

  var scrollTo = $('#chatBox').prop('scrollHeight') + 'px';
  $('#chatBox').slimScroll({ scrollTo : scrollTo });



  $('form').validator().on('submit', function (e){
    e.preventDefault();

    background.loggedIn = true;

    $('input').each(function() {
      $(this).val('');
    });

    $('#login').hide();
    $('#feed').show();
  });

  $('#new').click(function() {
    $(this).parent().html('<input class="form-control" type="text">');
  });

  $('#logout').click(function(){
    background.loggedIn = false;
    $('#login').show();
    $('#feed').hide();
  });

  $('#contacts li').click(function(){
    var contact = $(this).children('.contactName').html();
    $('#contacts li').removeClass('selected');
    $('#currentContactName').html(contact);
    $(this).addClass('selected');
  });


  $('#dropPage').click(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'drop', function(response){
          var img = '<img class="img-responsive" src="'+ response.image + '"/>';

          $('#chatBox').append('<li class="messageRight">' + img + '<a target="_blank" href="' + response.link + '">' + response.title + '</a></li>');

          var scrollTo = $('#chatBox').prop('scrollHeight') + 'px';
          $('#chatBox').slimScroll({ scrollTo : scrollTo });
      });
    });
  });
});
