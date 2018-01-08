/* global API_URL */

var theApp = angular.module('theApp', ['ngRoute', 'ngCookies', 'smart-table', 'ui.bootstrap']);
theApp.constant('API_URL', API_URL); //define CONST API_URL

(function () {
    'use strict';
    theApp
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
    function config($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                controller: 'PayController',
                templateUrl: 'pay/pay.view.html',
                controllerAs: 'vm'
            })
            .when('/alert_success/', {
                controller: 'AlertSuccessController',
                templateUrl: 'alert.success/alert.success.view.html'
            })
            .when('/alert_faile/', {
                controller: 'AlertFaileController',
                templateUrl: 'alert.faile/alert.faile.view.html'
            })
            .when('/invoice_err/', {
                controller: 'InvoiceErrController',
                templateUrl: 'invoice.err/invoice.err.view.html'
            })
            .otherwise({ redirectTo: '/' });
        
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    run.$inject = ['$rootScope'];
    function run($rootScope) {
	        
    }
})();
