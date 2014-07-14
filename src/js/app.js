
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
    // .when('/about', {
    //   templateUrl: 'views/about.html',
    //   controller: 'AboutCtrl'
    // })
    .otherwise({
      redirectTo: '/'
    });
});




app.controller( 'mainController', ['$scope', mainController]);
app.controller( 'postsController', ['$scope', 'Post', postsController]);
app.controller( 'postViewCtrl', ['$scope', '$routeParams', 'Post', postViewCtrl]);

app.factory('Post', ['$resource', '$firebase', 'FIREBASE_URL', postService] );
