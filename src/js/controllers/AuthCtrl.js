'use strict';

module.exports = function($scope, $location, Auth) {

  if ( Auth.signedIn() ) {
    $location.path('/');
  }

  $scope.$on('$firebaseSimpleLogin:login', function () {
    $location.path('/posts');
  });

  $scope.login = function () {
    Auth.login($scope.user).then(function () {
      $location.path('/posts');
    }, function (error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function () {
    Auth.register($scope.user).then(function (authUser) {
      console.log(authUser);
      $location.path('/posts');
    }, function (error) {
      $scope.error = error.toString();
    });
  };

};
