/* global $ */
$(document).ready(function(){

  'use strict';

  console.log('\'Allo \'Allo! Popup');

  var background = chrome.extension.getBackgroundPage();

  if(!background.loggedIn){
    $('#login').show();
  }else{
    $('#feed').show();
  }

  $('form').validator().on('submit', function (e){
    e.preventDefault();

    background.loggedIn = true;

    $('input').each(function() {
      $(this).val('');
    });

    $('#login').hide();
    $('#feed').show();
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
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, "drop", function(response){
         $("#chatBox ul").append("<li class='messageRight'><a target='_blank' href= '" + response.link + " '>" + response.title + "</a> <p>" + response.description + " </p></li>");  
      });
    });
  });

});