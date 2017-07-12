(function() {
  'use strict';

  angular.module('hang.game').controller('GameController', GameController);

  GameController.$inject = ['dataService', 'dataUrl', '$document'];

  function GameController(dataService, dataUrl, $document) {
    console.log('game loaded');
    let vm = this;
    vm.guess = null;
    vm.keyPressed = keyPressed;
    vm.failedLetters = [];
    vm.corpse = null;
    vm.bodyPart = null;
    vm.loss = false;

    activate();
    createBodyMap();

    function keyPressed (event) {
      console.log(event.key, vm.guess);
      checkWord(event.key)
    }

    function checkWord (char) {
      let letter = char.toLowerCase();

      if(!isNaN(letter)) {
        vm.guess = null;
        return;
      }
      
      if (vm.word.includes(letter)) {
        vm.letterIndex = vm.word.indexOf(letter);
        vm.answer[vm.letterIndex] = letter;
      } else {
        vm.failedLetters.push(letter);
        displayBodypart(vm.failedLetters.length);
        vm.loss = vm.failedLetters.length === vm.corpse.size ? true : false;
      }
      vm.guess = null;
    }

    function activate () {
      return getWord().then(function() {
        console.log('Word received', vm.word);
        vm.wordArray = [...vm.word];
        vm.answer = new Array(vm.wordArray.length);
      })
    }

    function getWord () {
      return dataService.get(`${dataUrl}`).then(function(data) {
        vm.word = data.word;
        return vm.word.toLowerCase();
      })
    }

    function createBodyMap (){
      vm.corpse = new Map();
      for (let i = 1; i < 11; i++){
        vm.corpse.set(i,`bodypart-${i}`);
      }
      console.log(vm.corpse);
    }

    function displayBodypart (bodypart){
      vm.bodyPart = vm.corpse.get(bodypart);
    }

  }
})();
