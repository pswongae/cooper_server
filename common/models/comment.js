var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var loopback = require('loopback');

module.exports = function(Comment) {

	Comment.createComment = function(data, cb){
		var ctx = loopback.getCurrentContext();
		// var accessToken = ctx.get('accessToken');
		// console.log(accessToken);
    	var currentUser = ctx && ctx.get('currentUser');
    	// console.log(currentUser);

    	data.create_time = new Date();
    	data.last_modified_time = data.create_time;
    	if (currentUser != null){
	    	data.memberId = currentUser.id;
	    }

		Comment.create(data, function(err, comment){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				console.log("Insert Comment Record: ", comment);
				if (data.tag != null){
					var Tag = app.models.Tag;
					for (var i=0; i<data.tag.length; i++){
						var tagData = {};
						tagData.name = data.tag[i];
						tagData.is_post = false;
						tagData.commentId = comment.id;
						tagData.postId = data.postId;
						Tag.createTag(tagData, function(err, tag){
							if (err){
								console.log(err);
							} else{
								console.log("Insert Tag(Comment) Record: ", tag);
							}
						});
					}
				}
				comment.post(function(err, post){
					if (err){
						console.log(err);
					} else{
						var postData = {};
						postData.last_modified_time = data.last_modified_time;
						post.updateAttributes(postData, function(err, post){
							if (err){
								console.log(err);
							} else{
								console.log("Edit Post: ", post);
							}
						});
					}
				});
				console.log("Comment Created");
				cb(null, comment);
			}
		});
	}

	Comment.getComment = function(data, cb){
		Comment.find(data, function(err, comment){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				var commentArray = new Array();
				Comment.getCommentArray(commentArray, comment, 0, function(err, commentArray){
					if (err){
						console.log(err);
						cb(err, null);
					} else{
						console.log("Get Comment(s): ", commentArray);
						cb(null, commentArray);
					}
				});
			}
		});
	}

	Comment.getCommentArray = function(commentArray, comment, i, cb){
		if (i < comment.length){
			var commentObj = comment[i];
			var mDate = new Date(Date.parse(commentObj.last_modified_time));
			commentObj.date = mDate.getDate().toString() + " - " + 
							(mDate.getMonth()+1).toString() + " - " + 
							mDate.getFullYear().toString();
			commentObj.time = mDate.getHours().toString() + " : " + 
							mDate.getMinutes().toString() + " : " + 
							mDate.getSeconds().toString();
			comment[i].member(function(err, mem){
				if (err){
					console.log(err);
					cb(err, null);
				} else{
					commentObj.author = mem.username;
					commentObj.authorTitle = mem.jobtitle;
					commentArray.push(commentObj);
					Comment.getCommentArray(commentArray, comment, i+1, cb);
				}
			});
		} else{
			cb(null, commentArray);
		}
	}

	Comment.editComment = function(data, cb){
		Comment.findById(data.id, function(err, comment){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				var commentData = data;
				commentData.last_modified_time = new Date();
				comment.updateAttributes(commentData, function(err, comment){
					if (err){
						console.log(err);
						cb(err, null);
					} else{
						comment.post(function(err, post){
							if (err){
								console.log(err);
							} else{
								var postData = {};
								postData.last_modified_time = commentData.last_modified_time;
								post.updateAttributes(postData, function(err, post){
									if (err){
										console.log(err);
									} else{
										console.log("Edit Post: ", post);
									}
								});
							}
						});
						console.log("Edit Comment: ", comment);
						cb(null, comment);
					}
				});
			}
		});
	}

	Comment.remoteMethod('createComment', {
		http: {path: '/createComment', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'comment', type: 'object'}
	});

	Comment.remoteMethod('getComment', {
		http: {path: '/getComment', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'comment', type: 'object'}
	});

	Comment.remoteMethod('editComment', {
		http: {path: '/editComment', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'comment', type: 'object'}
	});

};
