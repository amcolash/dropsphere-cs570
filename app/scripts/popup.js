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


  // add in contact list ////////////////////////////////////////////////////////////
  var contacts = background.contacts;

  contacts.forEach(function(contact){
     var contactElement = '<span class="contactName">' + contact + '</span></li>';
     $('#contactList').append('<li><img class="contactImage" src="images/user-128.png" alt="contact image">' + contactElement);
  });


  fillConvo(); // fill the messages in chatbox for current contact 

 ////////////////////////////////////////////////////////////////////////////////////

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

  $('#filterLinks').click(function(){
    filterLinks();
  });


  $('#contacts li').click(function(){
    var contact = $(this).children('.contactName').html();
    $('#contacts li').removeClass('selected');
    $(this).addClass('selected');
    fillConvo(contact);
  });


  // shows dropped page in feed and sends to server 
  $('#dropPage').click(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, 'drop', function(response){
          var img = '<img class="img-responsive" src="'+ response.image + '"/>';
          var msgElement = '<li class="messageRight linkItem">' + img + '<a target="_blank" href="' + response.link + '">' + response.title + '</a></li>';
          $('#chatBox').append(msgElement);

          var scrollTo = $('#chatBox').prop('scrollHeight') + 'px';
          $('#chatBox').slimScroll({ scrollTo : scrollTo });

          background.storeMessage(msgElement);
      });
    });
  });



  // place message in chat and to server on enter 
  $('#feed').on('keypress', 'input#dropContent', function(e){

        if(e.keyCode==13 && !e.shiftKey){
            e.preventDefault();
            var msg = $('#dropContent').val();
            var msgElement  = '<li class="messageRight">' + msg + '</li> <br>';
            $('#chatBox').append(msgElement);
            $('#dropContent').val("");
            background.sendMsg(msg);
            background.storeMessage(msgElement);
        }
  }); 

  function fillConvo(name){
      var messages = background.getConvo(name);
      $('#chatBox').empty();
      messages.forEach(function(msg){
         $('#chatBox').append(msg);
      });
  }

  function filterLinks(){
    $('.messageRight').each(function(){
      if(!($(this).hasClass('linkItem'))){
        $(this).hide();
      }
    })

  }

});
