'use strict';

module.exports = function($scope, $routeParams, Post) {
  $scope.post = Post.find( $routeParams.postId );
};
