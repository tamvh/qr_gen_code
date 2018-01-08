/* global theApp */

(function () {
    'use strict';
    
    theApp.controller('InvoiceErrController', InvoiceErrController);
    
    InvoiceErrController.$inject = ['$scope', '$rootScope'];
    function InvoiceErrController($scope,  $rootScope) {
        $scope.init = function() {
            console.log('===InvoiceErrController.init()===');
        };
        $scope.init();    
    }
})();