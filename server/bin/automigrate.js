var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var loopback = require('loopback');

var dataSource = app.dataSources.mySQL;

// dataSource.automigrate('member', function(err) {
//   if(err) throw err;
//   console.log("member");

// });

dataSource.automigrate('post', function(err) {
  if(err) throw err;
  console.log("post");

});

dataSource.automigrate('comment', function(err) {
  if(err) throw err;
  console.log("comment");

});

dataSource.automigrate('tag', function(err) {
  if(err) throw err;
  console.log("tag");

});

dataSource.automigrate('position', function(err) {
  if(err) throw err;
  console.log("position");

});

// dataSource.automigrate('test', function(err) {
//   if(err) throw err;
//   console.log("test");

// });