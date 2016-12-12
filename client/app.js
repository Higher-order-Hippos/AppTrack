angular.module('at', [
  'at.addApps',
  'at.allApps',
  'at.completedApps',
  'at.auth',
  'at.services',
  'at.upload',
  'ngRoute'
])

.config(($routeProvider, $locationProvider, $httpProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: './app/allApps/allApps.html',
    controller: 'AllAppsController',
    authenticate: true, //change to true once auth works
  })
  .when('/addApps', {
    templateUrl: './app/addApps/addApps.html',
    controller: 'AddAppsController',
    authenticate: true, //change to true once auth works
  })
  .when('/completedApps', {
    templateUrl: './app/completedApps/completedApps.html',
    controller: 'CompletedAppsController',
    authenticate: true, //change to true once auth works
  })
  .when('/login', {
    templateUrl: './app/login/login.html',
    controller: 'AuthController',
  })
  .when('/signup', {
    templateUrl: './app/login/signup.html',
    controller: 'AuthController',
  })
  .otherwise({ redirectTo: '/' });
  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false,
  // });
  $httpProvider.interceptors.push('AttachTokens'); // will attach token to the localStorage
})

.factory('AttachTokens', ($window) => {
  const attach = {
    request(object) {
      const jwt = $window.localStorage.getItem('app-trak');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }

      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    },
  };
  return attach;
})

.run(($rootScope, $location, Auth) => { // handles the authentication where authentication: true above
  $rootScope.$on('$routeChangeStart', (evt, next, current) => {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/login');
    }
  });
});
