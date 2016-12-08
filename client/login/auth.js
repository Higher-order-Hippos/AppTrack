angular.module('at.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = () => {
    //pass entire user scope down
    //receives jwt encoded username after backend query resolves
    Auth.signin($scope.user)
      .then((token) => {
        $window.localStorage.setItem('com.hohlife', token);
        $location.path('/');
      })
      .catch((error) => {
        console.error(error);   //TODO implement error catch with connect-flash when no user/password invalid
      });
  };

  $scope.signup = () => {
    //pass entire user scope down
    //receives jwt encoded username after backend query to add user resolves
    Auth.signup($scope.user)
      .then((token) => {
        $window.localStorage.setItem('com.hohlife', token);
        $location.path('/');
      })
      .catch((error) => {
        console.error(error);   //TODO implement error catch with connect-flash when user already exists
      });
  };

  $scope.signout = () => {
    Auth.signout();
  };

  $scope.isAuth = () => {
    //to show and hide logout button on index.html page, checks to see if page header exists.
    //Page header added when auth is successful or on signup
    return !!$window.localStorage.getItem('com.hohlife');
  };

});
