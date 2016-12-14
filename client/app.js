angular.module('at', [
  'at.addApps',
  'at.allApps',
  'at.completedApps',
  'at.auth',
  'at.services',
  'at.account',
  'ngRoute',
  'ui.bootstrap',
  'ui.mask',
])

.config(($routeProvider, $locationProvider, $httpProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: './app/cover/cover.html',
  })
  .when('/allApps', {
    templateUrl: './app/allApps/allApps.html',
    controller: 'AllAppsController',
    authenticate: true,
  })
  .when('/addApps', {
    templateUrl: './app/addApps/addApps.html',
    controller: 'AddAppsController',
    authenticate: true,
  })
  .when('/completedApps', {
    templateUrl: './app/completedApps/completedApps.html',
    controller: 'CompletedAppsController',
    authenticate: true,
  })
  .when('/login', {
    templateUrl: './app/login/login.html',
    controller: 'AuthController',
  })
  .when('/signup', {
    templateUrl: './app/login/signup.html',
    controller: 'AuthController',
  })
  .when('/myaccount', {
    templateUrl: './app/account/account.html',
    controller: 'AccountController'
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
