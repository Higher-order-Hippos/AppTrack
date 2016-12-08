angular.module('at.addApps', [])

.controller('AddAppsController', function ($scope, Application) {

  $scope.data = {};

  $scope.stageSelect = [
    'Select Stage Type',
    'Phone Interview',
    'In-Person Interview(One)',
    'Whiteboarding Session',
    'In-Person Interview(Group)',
    'Full-Day Interview Session',
    'Coding Challenge',
  ];

  $scope.submitForm = () => {
    Application.postData($scope.data)
      .then((resp) => {
        console.log(resp);
      });
  };


});
