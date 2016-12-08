angular.module('at', [
  'at.addApps',
  'at.auth',
  'at.services',
  'ngRoute',
])

.config(($routeProvider, $httpProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: './app/allApps/allApps.html',
    controller: 'AllAppsController',
    authenticate: false, //change to true once auth works
  })
  .when('/addApps', {
    templateUrl: './app/addApps/addApps.html',
    controller: 'AddAppsController',
    authenticate: false, //change to true once auth works
  })
  .when('/login', {
    templateUrl: './login/login.html',
    controller: 'AuthController',
  })
  .when('/signup', {
    templateUrl: './login/signup.html',
    controller: 'AuthController',
  })
  .otherwise({ redirectTo: '/' });
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
