'use strict';

angular.module('permission', [
    'ngRoute'
])
    .config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/', {
            template: '<permission-block></permission-block>'
        }).
        otherwise('/');
    }
]);
