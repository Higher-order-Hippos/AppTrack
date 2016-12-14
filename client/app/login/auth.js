angular.module('at.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = () => {
    //pass entire user scope down
    //receives jwt encoded username after backend query resolves
    Auth.signin($scope.user)
      .then((token) => {
        $window.localStorage.setItem('app-trak', token);
        $location.path('/allApps');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  $scope.signup = () => {
    //pass entire user scope down
    //receives jwt encoded username after backend query to add user resolves
    Auth.signup($scope.user)
      .then((token) => {
        $window.localStorage.setItem('app-trak', token);
        $location.path('/allApps');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  $scope.signout = () => {
    Auth.signout();
  };

  $scope.isAuth = () => {
    //to show and hide logout button on index.html page, checks to see if page header exists.
    //Page header added when auth is successful or on signup
    return !!$window.localStorage.getItem('app-trak');
  };

  $scope.getUserName = () => {
    //only use for this function is to grab username and display it in top navbar for "Welcome **username**!"
    Auth.getUserName()
    .then((username) => {
      $scope.username = username;
    })
  };

  $scope.getUserName();

});
