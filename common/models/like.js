var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var loopback = require('loopback');

module.exports = function(Like) {

	Like.clickLike = function(data, cb){
		var ctx = loopback.getCurrentContext();
		// var accessToken = ctx.get('accessToken');
		// console.log(accessToken);
    	var currentUser = ctx && ctx.get('currentUser');
    	// console.log(currentUser);

    	Like.isLiked(data, function(err, like){
    		if (err){
				console.log(err);
				cb(err, null);
			} else{
				if (like == null){
					var likeData = {};
					likeData.postId = data.postId;
					likeData.memberId = currentUser.id;
					Like.create(likeData, function(err, like){
						if (err){
							console.log(err);
							cb(err, null);
						} else{
							console.log("Like added: ", like);
							like.post(function(err, post){
								if (err){
									console.log(err);
									cb(err, null);
								} else{
									var postData = {};
									postData.like_num = post.like_num + 1;
									post.updateAttributes(postData, function(err, post){
										if (err){
											console.log(err);
											cb(err, null);
										} else{
											console.log("Edit Post: ", post);
											cb(null, like);
										}
									});
								}
							});
						}
					});
				} else{
					Like.destroyById(like.id, function(err){
						if (err){
							console.log(err);
							cb(err, null);
						} else{
							console.log("Like cancelled: ", like);
							like.post(function(err, post){
								if (err){
									console.log(err);
									cb(err, null);
								} else{
									var postData = {};
									postData.like_num = post.like_num - 1;
									post.updateAttributes(postData, function(err, post){
										if (err){
											console.log(err);
											cb(err, null);
										} else{
											console.log("Edit Post: ", post);
											cb(null, "Cancelled");
										}
									});
								}
							});
						}
					});
				}
			}
    	});
	}

	Like.isLiked = function(data, cb){
		var ctx = loopback.getCurrentContext();
		// var accessToken = ctx.get('accessToken');
		// console.log(accessToken);
    	var currentUser = ctx && ctx.get('currentUser');
    	// console.log(currentUser);

    	Like.findOne({"where": {"postId": data.postId, "memberId": currentUser.id}}, function(err, like){
    		if (err){
				console.log(err);
				cb(err, null);
			} else{
				cb(null, like);
			}
    	});
	}

	Like.remoteMethod('clickLike', {
		http: {path: '/clickLike', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'like', type: 'object'}
	});

	Like.remoteMethod('isLiked', {
		http: {path: '/isLiked', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'like', type: 'object'}
	});

};
