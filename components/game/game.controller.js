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

				activate();

        console.log($document);

        function keyPressed(event) {
            console.log(event.key, vm.guess);
						checkWord(event.key)
        }

				function checkWord(char){
					let letter = char.toLowerCase();
					if(vm.word.includes(letter)){
						vm.letterIndex = vm.word.indexOf(letter);
						vm.answer[vm.letterIndex] = letter;

					} else {
						vm.failedLetters.push(letter);
					}
				}

        function activate() {
            return getWord().then(function() {
                console.log('Word received', vm.word);
                vm.wordArray = [...vm.word];
								vm.answer = new Array(vm.wordArray.length);
            })
        }

        function getWord() {
            return dataService.get(`${dataUrl}`).then(function(data) {
                vm.word = data.word;
                return vm.word.toLowerCase();
            })
        }

    }
})();
