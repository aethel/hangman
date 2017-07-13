(function() {
    'use strict';

    angular.module('hang.game').controller('GameController', GameController);

    GameController.$inject = ['dataService', 'dataUrl', '$document'];

    function GameController(dataService, dataUrl, $document) {
        let vm = this;
        vm.guess = null;
        vm.keyPressed = keyPressed;
        vm.failedLetters = [];
        vm.bodyMap = null;
        vm.bodyPart = null;
        vm.loss = false;
        vm.displayBodypart = displayBodypart;
        vm.restart = restart;

        let bodyPartsArr = [];

        activate();
        createBodyMap();

        function keyPressed(event) {
            checkWord(event.key)
        }

        function checkWord(char) {
            let letter = char.toLowerCase();

            if (!isNaN(letter) || hasFailed(letter)) {
                vm.guess = null;
                return;
            }

            if (vm.word.includes(letter)) {
                vm.letterIndex = vm.word.indexOf(letter);
                vm.answer[vm.letterIndex] = letter;
            } else {
                vm.failedLetters.push(letter);
                bodyPartsArr.push(vm.bodyMap.get(vm.failedLetters.length));
                vm.loss = vm.failedLetters.length === vm.bodyMap.size ? true : false;
            }
            vm.guess = null;
        }

        function activate() {
            return getWord().then(function() {
                if (vm.word && vm.word.includes('-')) vm.word = vm.word.replace('-', '');
                console.log('Word received', vm.word);
                vm.wordArray = [...vm.word];
                vm.answer = new Array(vm.wordArray.length);
            })
        }

        function getWord() {
            return dataService.get(`${dataUrl}`).then(function(data) {
                if (data) vm.word = data.word.toLowerCase();
                return vm.word;
            })
        }

        function createBodyMap() {
            vm.bodyMap = new Map();
            for (let i = 1; i < 11; i++) {
                vm.bodyMap.set(i, `bodypart-${i}`);
            }
        }

        function displayBodypart(bodypart) {
            return bodyPartsArr.includes(bodypart);
        }

        function hasFailed(character) {
            return vm.failedLetters.some(c => c === character);
        }

        function restart() {
            vm.failedLetters = [];
            vm.loss = false;
            bodyPartsArr = [];
            vm.guess = null;
            activate();
        }
    }
})();
