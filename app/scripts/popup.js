/* global $ */

'use strict';

$(function() {

  console.log('\'Allo \'Allo! Popup');

  var background = chrome.extension.getBackgroundPage();


  if(!background.loggedIn){
    $('#login').show();
  }else{
    $('#feed').show();
    $('#user').removeClass('invisible');
  }

  $('#contactList').slimScroll({
    height: '376px'
  });

  $('#chatBox').slimScroll({
    height: '337px'
  });

  $('.slimScrollBar').hide();

  var scrollTo = $('#chatBox').prop('scrollHeight') + 'px';
  $('#chatBox').slimScroll({ scrollTo : scrollTo });


  // add in contact list ////////////////////////////////////////////////////////////
  var contacts = [];

  $("#contacts li").each(function(){
      contacts.push($(this).children('.contactName').html());
  });

  background.initializeContacts(contacts);

  fillConvo(); // fill the messages in chatbox for current contact

 ////////////////////////////////////////////////////////////////////////////////////

  // $('form').validator().on('submit', function (e){
  //   e.preventDefault();
  //
  //   background.loggedIn = true;
  //
  //   $('input').each(function() {
  //     $(this).val('');
  //   });
  //
  //   $('#login').hide();
  //   $('#feed').show();
  // });

  $('.login').click(function() {
    background.loggedIn = true;

    $('#login input').each(function() {
      $(this).val('');
    });

    $('#login').hide();
    $('#feed').show();
    $('#user').removeClass('invisible');
  });

  $('#logout').click(function(){
    background.loggedIn = false;
    $('#login').show();
    $('#user').addClass('invisible');
    $('#feed').hide();
  });

  $('#filterLinks input').change(function(){
    if ($('#filterLinks input').prop('checked')) {
      filterLinks(true);
    } else {
      filterLinks(false);
    }
  });

  ////////////////////////////////////// drag + drop share events ///////////////////////////////////////////////////////////////

  var draggedContent;
  var convoSwitched = false;

  $("#chatBox").on("dragstart", ".linkItem",  function(event){
    draggedContent = this.outerHTML;
  });

  $('#contacts li').on("dragover", function(event){
    event.preventDefault();
    $(this).addClass('selected');
  });

  $('#contacts li').on("dragleave", function(event){
    event.preventDefault();
    $(this).removeClass('selected');
  });

  $('#contacts li').on("drop", function(event){
    event.preventDefault();
    var contact = $(this).children('.contactName').html();
    if(contact != background.currentConvo){
      background.switchConvo(contact);
      background.storeMessage(draggedContent);
      fillConvo();
      $('#contacts li').removeClass('selected');
      $(this).addClass('selected');
      convoSwitched = false;
      setTimeout(fakeResponse, 1000);
    }
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  $('#contacts li').click(function(){
    var contact = $(this).children('.contactName').html();
    $('#contacts li').removeClass('selected');
    $(this).addClass('selected');
    convoSwitched = true;
    fillConvo(contact);
  });

  // shows dropped page in feed and sends to server
  $('#dropPage').click(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, 'drop', function(response){
          var img = '<img class="img-responsive" src="'+ response.image + '"/>';
          var msgElement = '<li draggable="true" class="messageRight linkItem">' + img + '<a target="_blank" href="' + response.link + '">' + response.title + '</a></li>';
          $('#chatBox').append(msgElement);

          var scrollTo = $('#chatBox').prop('scrollHeight') + 'px';
          $('#chatBox').slimScroll({ scrollTo : scrollTo });

          background.storeMessage(msgElement);
          convoSwitched = false;
          setTimeout(fakeResponse, 1000);
      });
    });
  });



  // place message in chat and to server on enter
  $('#feed').on('keypress', 'input#dropContent', function(e){

        if(e.keyCode==13 && !e.shiftKey){
            e.preventDefault();
            var msg = $('#dropContent').val().trim();

            if(msg){
              var msgElement  = '<li class="messageRight">' + msg + '</li> <br>';
              $('#chatBox').append(msgElement);
              $('#dropContent').val("");
              background.storeMessage(msgElement);
              var scrollTo = $('#chatBox').prop('scrollHeight') + 'px';
              $('#chatBox').slimScroll({ scrollTo : scrollTo });

            }

           // background.sendMsg(msg);
        }
  });

  function fillConvo(name){
      var messages = background.getConvo(name);
      $('#chatBox').empty();
      if (messages) {
        messages.forEach(function(msg){
          $('#chatBox').append(msg);
        });
      }
  }

  function filterLinks(hide){
    convoSwitched = true;
    $('#chatBox li').each(function(){
      if(!($(this).hasClass('linkItem'))){
        if (hide) {
          $(this).hide();
        } else {
          $(this).show();
        }

        var scrollTo = $('#chatBox').prop('scrollHeight') + 'px';
        $('#chatBox').slimScroll({ scrollTo : scrollTo });

      }
    });
  }


  function fakeResponse(){
    if(!convoSwitched && background.currentConvo != "Me"){
      var responses = ['Awesome!', 'Thats so cool!', 'meh', 'I want more!', 'Seen it already', 'That is so fetch!'];
      var msg  = responses[Math.floor(Math.random() * (responses.length - 1)) + 0];
      var msgElement  = '<li class="messageLeft">' + msg + '</li> <br>';
      $('#chatBox').append(msgElement);
      var scrollTo = $('#chatBox').prop('scrollHeight') + 'px';
      $('#chatBox').slimScroll({ scrollTo : scrollTo });

      background.storeMessage(msgElement);
    }
  }



});
