angular.module('at.services', [])

.factory('Application', ($http) => {
  const postData = (form) => $http({
    method: 'POST',
    url: '/api/form',
    data: { form },
  })
    .then(({ data }) => data);

  const getData = () => $http({
    method: 'GET',
    url: '/api/form',
  })
    .then(({ data }) => data);

  const getJob = (role) => $http({
    method: 'GET',
    url: `/api/form/${role}`,
  })
    .then(({ data }) => data);

  const putStageData = (id, stages) => $http({
    method: 'POST',
    url: `/form/${id}`,
    data: { stages },
  })
    .then((resp) => resp.data);

  const putEditData = (id, edit) => $http({
    method: 'POST',
    url: `/edit/${id}`,
    data: { edit },
  })
    .then((resp) => resp.data);

  return { postData, getData, getJob, putStageData, putEditData };
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

  const isAuth = () => !!$window.localStorage.getItem('app-trak');

  const signout = () => {
    $window.localStorage.removeItem('app-trak');
    $location.path('/login');
  };

  return { signin, signup, isAuth, signout };
});
