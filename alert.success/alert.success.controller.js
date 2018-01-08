/* global theApp */

(function () {
    'use strict';
    
    theApp.controller('AlertSuccessController', AlertSuccessController);
    
    AlertSuccessController.$inject = ['$scope', '$rootScope'];
    function AlertSuccessController($scope,  $rootScope) {
        $scope.init = function() {
            console.log('===AlertSuccessController.init()===');
            $rootScope.click_btnthanhtoan = false;
        };
        $scope.init();    
    }
})();