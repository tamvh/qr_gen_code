/* global theApp */

(function () {
    'use strict';
    theApp.controller('AlertFaileController', AlertFaileController);
    AlertFaileController.$inject = ['$scope', '$rootScope'];
    function AlertFaileController($scope,  $rootScope) {
        $scope.init = function() {
            console.log('===AlertFaileController.init()===');
            $rootScope.click_btnthanhtoan = false;
        };
        $scope.init();    
    }
})();