var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var loopback = require('loopback');

module.exports = function(Member) {

	Member.register = function(data, cb){
		console.log("Start Register");
		Member.create(data, function(err, member){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				console.log("Insert Member Record: ", member);
				cb(null, member);
			}
		});
	}

	Member.afterRemote('register', function(context, obj, next){
	    Member.findById(obj.member.id, function(err, mem){
	    	if (err){
	    		console.log(err);
	    		next();
	    	} else{
		    	var options = {
					type: 'email',
					to: obj.email,
					from: 'no-reply@cooper.com',
					subject: 'Cooper: Verify your email address',
					template: path.resolve(__dirname, '../../server/views/verify.ejs'),
					redirect: '/verified',
					user: mem
			    };
			    mem.verify(options, function(err, response, next) {
					if (err){ 
						return next(err);
					}
					console.log('Verification Email Sent:', response);
					console.log("Register Completed");
			    });
			    next();
			}
		});
	});

	Member.afterRemote('login', function(context, obj, next){
		console.log("Login: ", obj);
		next();
	});

	Member.afterRemote('logout', function(context, obj, next){
		console.log("Logout");
		next();
	});

	Member.getMember = function(data, cb){
		var ctx = loopback.getCurrentContext();
		// var accessToken = ctx.get('accessToken');
		// console.log(accessToken);
    	var currentUser = ctx && ctx.get('currentUser');
    	// console.log(currentUser);

    	if (currentUser != null){
    		console.log(currentUser);
    		cb(null, currentUser);
    	} else{
    		var errMsg = "Fail to get current user";
    		console.log(errMsg);
    		cb(null, errMsg);
    	}
	}

	Member.editMember = function(data, cb){
		var ctx = loopback.getCurrentContext();
		// var accessToken = ctx.get('accessToken');
		// console.log(accessToken);
    	var currentUser = ctx && ctx.get('currentUser');
    	// console.log(currentUser);

    	if (currentUser != null){
    		Member.findById(currentUser.id, function(err, mem){
    			if (err){
    				console.log(err);
    				cb(err, null);
    			} else{
	    			mem.updateAttributes(data, function(err, mem){
	    				if (err){
		    				console.log(err);
		    				cb(err, null);
		    			} else{
		    				console.log("Edit Member: ", mem);
		    				cb(null, mem);
		    			}
	    			});
	    		}
    		});
    	} else{
    		var errMsg = "Fail to get current user";
    		console.log(errMsg);
    		cb(null, errMsg);
    	}
	}

	Member.remoteMethod('register', {
		http: {path: '/register', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'member', type: 'object'}
	});

	Member.remoteMethod('getMember', {
		http: {path: '/getMember', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'member', type: 'object'}
	});

	Member.remoteMethod('editMember', {
		http: {path: '/editMember', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'member', type: 'object'}
	});
};
