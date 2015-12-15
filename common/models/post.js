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
    	if (data.view_num == null){
    		data.view_num = 0;
		}
		if (data.like_num == null){
    		data.like_num = 0;
    	}
    	if (currentUser != null){
	    	data.memberId = currentUser.id;
	    }
    	var catNameArray = new Array();
    	var catArray = new Array();
    	// console.log(data.categories);
    	for (var i=0; i<data.categories.length; i++){
    		// console.log(data.categories[i]);
    		catNameArray.push(data.categories[i].name);
    		catArray.push(data.categories[i]);
		}
		data.categories = catNameArray;

		Post.create(data, function(err, post){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				console.log("Insert Post Record: ", post);
				var Comment = app.models.Comment;
				for (var i=0; i<catArray.length; i++){
					var commentData = {};
					commentData.create_time = data.create_time;
					commentData.last_modified_time = data.last_modified_time;
					commentData.category = catArray[i].name;
					commentData.content = catArray[i].description;
					commentData.memberId = data.memberId;
					commentData.postId = post.id;
					commentData.tag = catArray[i].tag;
					Comment.createComment(commentData, function(err, comm){
						if (err){
							console.log(err);
						}
					});
				}
				if (data.tag != null){
					var Tag = app.models.Tag;
					for (var i=0; i<data.tag.length; i++){
						var tagData = {};
						tagData.name = data.tag[i];
						tagData.is_post = true;
						tagData.postId = post.id;
						Tag.createTag(tagData, function(err, tag){
							if (err){
								console.log(err);
							} else{
								console.log("Insert Tag(Post) Record: ", tag);
							}
						});
					}
				}
				console.log("Post Created: ", post);
				cb(null, post);
			}
		});
	}

	Post.getPost = function(data, cb){
    	Post.find(data, function(err, post){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				var postArray = new Array();
				Post.getPostArray(postArray, post, 0, function(err, postArray){
					if (err){
						console.log(err);
						cb(err, null);
					} else{
						console.log("Get Post(s): ", postArray);
						cb(null, postArray);
					}
				});
			}
		});
	}

	Post.getPostArray = function(postArray, post, i, cb){
		if (i < post.length){
			var postObj = post[i];
			var mDate = new Date(Date.parse(postObj.last_modified_time));
			postObj.date = mDate.getDate().toString() + " - " + 
							(mDate.getMonth()+1).toString() + " - " + 
							mDate.getFullYear().toString();
			postObj.time = mDate.getHours().toString() + " : " + 
							mDate.getMinutes().toString() + " : " + 
							mDate.getSeconds().toString();
			post[i].member(function(err, mem){
				if (err){
					console.log(err);
					cb(err, null);
				} else{
					postObj.author = mem.username;
					var Tag = app.models.Tag;
					Tag.getTag({"where": {"is_post": true, "postId": postObj.id}, "order": "name ASC"}, function(err, tagObj){
						if (err){
							console.log(err, null);
							cb(err, null);
						} else{
							var tagArray = new Array();
							for (var j=0; j<tagObj.length; j++){
								tagArray.push(tagObj[j].name);
							}
							postObj.tags = tagArray;
							postArray.push(postObj);
							Post.getPostArray(postArray, post, i+1, cb);
						}
					});
				}
			});
		} else{
			cb(null, postArray);
		}
	}

	Post.editPost = function(data, cb){
		Post.findById(data.id, function(err, post){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				var postData = data;
				postData.last_modified_time = new Date();
				post.updateAttributes(postData, function(err, post){
					if (err){
						console.log(err);
						cb(err, null);
					} else{
						console.log("Edit Post: ", post);
						cb(null, post);
					}
				});
			}
		});
	}

	Post.remoteMethod('createPost', {
		http: {path: '/createPost', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'post', type: 'object'}
	});

	Post.remoteMethod('getPost', {
		http: {path: '/getPost', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'post', type: 'object'}
	});

	Post.remoteMethod('editPost', {
		http: {path: '/editPost', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'post', type: 'object'}
	});

};
