var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var loopback = require('loopback');

module.exports = function(Post) {

	Post.createPost = function(data, cb){
		var ctx = loopback.getCurrentContext();
		// var accessToken = ctx.get('accessToken');
		// console.log(accessToken);
    	var currentUser = ctx && ctx.get('currentUser');
    	// console.log(currentUser);

    	data.create_time = new Date();
    	data.last_modified_time = data.create_time;
    	data.is_recruiting = true;
    	data.view_num = 0;
    	data.like_num = 0;
    	data.memberId = currentUser.id;
    	var catNameArray = new Array();
    	var catArray = new Array();
    	console.log(data.categories);
    	for (var i=0; i<data.categories.length; i++){
    		console.log(data.categories[i]);
    		catNameArray.push(data.categories[i].name);
    		catArray.push(data.categories[i]);
		}
		data.categories = catNameArray;

		Post.create(data, function(err, post){
			if (err){
				console.log(err);
				cb(err, post);
			} else{
				console.log("Insert Record: ", post);
				var Comment = app.models.Comment;
				for (var i=0; i<catArray.length; i++){
					var commentData = {};
					commentData.create_time = data.create_time;
					commentData.last_modified_time = data.last_modified_time;
					commentData.category = catArray[i].name;
					commentData.content = catArray[i].description;
					commentData.memberId = data.memberId;
					commentData.postId = post.id;
					Comment.createComment(commentData, function(err, comm){
						if (err){
							console.log(err);
						} else{
						}
					});
				}
				cb(null, post);
			}
		});
	}

	Post.remoteMethod('createPost', {
		http: {path: '/createPost', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'post', type: 'object'}
	});

};
