/**
 * Text2Speech Tests
 */

"use strict";

var app = {

  elem: function(id) {
    return document.getElementById(id);
  },

  load: function() {

    if ('speechSynthesis' in window) {
      console.warn("speechSynthesis is not supported!");
    }    

    this.elem('say').addEventListener('click', this.onSpeak.bind(this), false);

    var voices = window.speechSynthesis.getVoices();
    voices.forEach(function(voice) {
      console.log(voice.name, voice.default ? '(default)' :'');
    });

  },

  onSpeak: function(event) {
    var text = this.elem('msg').innerHTML || 'No text entered!';
    console.log('speaking ...');

    var msg = new SpeechSynthesisUtterance(text);
    msg.voice = speechSynthesis.getVoices().filter(function(voice) { 
      return voice.name == 'Whisper'; })[0];
    
    speechSynthesis.speak(msg);
  }

};