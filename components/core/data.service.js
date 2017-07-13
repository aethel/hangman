(function() {
    'use strict';

    angular.module('hang.core').factory('dataService', dataService);

    dataService.$inject = ['$http'];

    function dataService($http) {
        let service = {
            get
        }

        return service;

        function get(url) {
            return $http.get(url)
                .then(success)
                .catch(failed);

            function success(response) {
                return response.data;
            }

            function failed(error) {
                console.log(`Failure getting data: ${error.data}`);
            }
        }
    }

})();
