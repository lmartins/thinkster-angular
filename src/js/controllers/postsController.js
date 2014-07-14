'use strict';

module.exports = function($scope, $location, Post) {

  $scope.posts = Post.all;

  $scope.resetForm = function () {
    $scope.post = {url: 'http://', title: ''};
  };
  $scope.resetForm();

  $scope.deletePost = function (postId) {
    Post.delete(postId);
  };

};
