'use strict';

module.exports = function($scope, Post) {

  $scope.posts = Post.all;

  $scope.resetForm = function () {
    $scope.post = {url: 'http://', title: ''};
  };
  $scope.resetForm();

  $scope.submitPost = function () {
    Post.create($scope.post).then(function () {
      $scope.resetForm();
    });
  };

  $scope.deletePost = function (postId) {
    Post.delete(postId);
  };

};
