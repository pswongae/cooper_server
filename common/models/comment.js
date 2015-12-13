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
    	data.memberId = currentUser.id;

		Comment.create(data, function(err, comment){
			if (err){
				console.log(err);
				cb(err, comment);
			} else{
				console.log("Insert Record: ", comment);
				// TODO: add tag

				console.log("Comment Created");
				cb(null, comment);
			}
		});
	}

	Comment.remoteMethod('createComment', {
		http: {path: '/createComment', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'comment', type: 'object'}
	});

};
