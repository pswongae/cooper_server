var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var loopback = require('loopback');

module.exports = function(View) {

	View.addView = function(data, cb){
		var ctx = loopback.getCurrentContext();
		// var accessToken = ctx.get('accessToken');
		// console.log(accessToken);
    	var currentUser = ctx && ctx.get('currentUser');
    	// console.log(currentUser);

    	View.isViewed(data, function(err, isViewed){
    		if (err){
				console.log(err);
				cb(err, null);
			} else{
				if (!isViewed){
					var viewData = {};
					viewData.postId = data.postId;
					viewData.memberId = currentUser.id;
					View.create(viewData, function(err, view){
						if (err){
							console.log(err);
							cb(err, null);
						} else{
							console.log("View added: ", view);
							view.post(function(err, post){
								if (err){
									console.log(err);
									cb(err, null);
								} else{
									var postData = {};
									postData.view_num = post.view_num + 1;
									post.updateAttributes(postData, function(err, post){
										if (err){
											console.log(err);
											cb(err, null);
										} else{
											console.log("Edit Post: ", post);
											cb(null, view);
										}
									});
								}
							});
						}
					});
				} else{
					cb(null, "Already viewed");
				}
			}
    	});
    	
	}

	View.isViewed = function(data, cb){
		var ctx = loopback.getCurrentContext();
		// var accessToken = ctx.get('accessToken');
		// console.log(accessToken);
    	var currentUser = ctx && ctx.get('currentUser');
    	// console.log(currentUser);

    	View.findOne({"where": {"postId": data.postId, "memberId": currentUser.id}}, function(err, view){
    		if (err){
				console.log(err);
				cb(err, null);
			} else{
				if (view == null){
					var Post = app.models.Post;
					Post.findById(data.postId, function(err, post){
						if (err){
							console.log(err);
							cb(err, null);
						} else{
							cb(null, post.memberId == currentUser.id);
						}
					});
				} else{
					cb(null, true);
				}
			}
    	});

	}

	View.remoteMethod('addView', {
		http: {path: '/addView', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'view', type: 'object'}
	});

};
