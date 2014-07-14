
'use strict';
require('angular');
require('angular-route');
require('firebase');
require('angular-fire');
require('npm-angular-resource')(window, angular);
// var ngResource = require('npm-angular-resource');

var mainController  = require('./controllers/mainController');
var postsController = require('./controllers/postsController');
var postViewCtrl = require('./controllers/postViewCtrl');
var AuthCtrl = require('./controllers/AuthCtrl');
var postService     = require('./services/postService');

var app = angular.module('angNewsApp', [
    'ngRoute',
    'ngResource',
    'firebase'
  ]);

app.constant('FIREBASE_URL','https://mwngnews.firebaseIO.com/');

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'mainController'
    })
    .when('/posts', {
      templateUrl: 'views/posts.html',
      controller: 'postsController'
    })
    .when('/posts/:postId', {
      templateUrl: 'views/showpost.html',
      controller: 'postViewCtrl'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'AuthCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AuthCtrl'
    })
    // .when('/about', {
    //   templateUrl: 'views/about.html',
    //   controller: 'AboutCtrl'
    // })
    .otherwise({
      redirectTo: '/'
    });
});




app.controller( 'mainController', ['$scope', mainController]);
app.controller( 'postsController', ['$scope', '$location', 'Post', postsController]);
app.controller( 'postViewCtrl', ['$scope', '$routeParams', 'Post', postViewCtrl]);
app.controller( 'AuthCtrl', [ '$scope', '$location', 'Auth', AuthCtrl ]);

app.factory('Post', ['$resource', '$firebase', 'FIREBASE_URL', postService] );

// TODO: Refactor the services and controllers bellow to their own files

app.factory('Auth', function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseSimpleLogin(ref);

  var Auth = {
    register: function (user) {
      return auth.$createUser( user.email, user.password );
    },
    signedIn: function () {
      return auth.user !== null;
    },
    login: function (user) {
      return auth.$login('password', user);
    },
    logout: function () {
      auth.$logout();
    }
  };

  $rootScope.signedIn = function () {
    return Auth.signedIn();
  };

  return Auth;

});


app.controller('NavCtrl', function ($scope, $location, Auth, Post) {
  $scope.post = {url: 'http://', title: ''};

  $scope.submitPost = function () {
    Post.create($scope.post).then(function (ref) {
      $location.path('/posts/' + ref.name());
      $scope.post = {url: 'http://', title: ''};
    });
  };

  $scope.logout = function () {
    Auth.logout();
  };

});


app.filter('hostnameFromUrl', function () {
  return function (str) {
    var url = document.createElement('a');
    url.href = str;
    return url.hostname;
  };
});
