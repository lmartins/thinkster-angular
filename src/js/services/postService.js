'use strict';

module.exports = function($resource, $firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'posts');
  var posts = $firebase(ref);
  // return $resource('https://mwngnews.firebaseIO.com/posts/:id.json');

  var Post = {
    all: posts,
    create: function (post) {
      return posts.$add(post);
    },
    find: function (postId) {
      return posts.$child(postId);
    },
    delete: function (postId) {
      return posts.$remove(postId);
    }
  };

  return Post;
};
