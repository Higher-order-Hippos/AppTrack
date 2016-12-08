angular.module('Services', [])

  .factory('HttpService', function($http){
  const postData = (data) => $http({
    method: 'POST',
    url: '/form',
    data: data
  })
    .then(({ data }) => data);

  const getData = () => $http({
    method: 'GET',
    url: '/form'
  })
    .then(({ data }) => data);

  const getJob = (role) => $http({
    method: 'GET',
    url: '/form/' + role
  })
    .then(({ data }) => data);

  const putStageData = (stage) => {
    // TODO this function needs to be fixed

    // console.log("Stage from within PutStageData HTTP service", stage.stages);
    // return $http.put('/form/' + stage.id, stage.stages)
    // .then(function(res) {
    //   console.log(res)
    //   return res;
    // })
  };

  const putEditData = (editData) => {
    // TODO this function needs to be fixed

    // console.log('THIS IS THE EDIT DATA FROM FACTORY: ', editData);
    // return $http.put('/edit/' + editData.id, editData.edit)
    // .then(function(res) {
    //   return res;
    // })
  };

  return { postData, getData, getJob, putStageData, putEditData }
})

.factory('Auth', ($http, $location, $window) => {
  const signin = ({ username, password }) => $http({
    method: 'POST',
    url: '/api/users/signin',
    data: { username, password },
  })
    .then(({ data: { token } }) => token);

  const signup = ({ username, password }) => $http({
    method: 'POST',
    url: '/api/users/signup',
    data: { username, password },
  })
    .then(({ data: { token } }) => token);

  const isAuth = () => !!$window.localStorage.getItem('com.hohlife');

  const signout = () => {
    $window.localStorage.removeItem('com.hohlife');
    $location.path('/login');
  };

  return { signin, signup, isAuth, signout };
});
