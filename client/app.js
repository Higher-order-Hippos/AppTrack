angular.module('AppTracker', [
  'Form',
  'SignUp',
  'Services',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'allApps.html',
      controller: 'allAppsController'
    })
    .when('/addApps', {
      templateUrl: 'addApps.html',
      controller: 'addAppsController'
    })
    .otherwise({
      redirectTo: '/'
    })
})
