var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var loopback = require('loopback');

module.exports = function(Position) {

	Position.createPosition = function(data, cb){
		var positionArray = new Array();
		Position.createPositionArray(positionArray, data, 0, function(err, positionArray){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				cb(null, positionArray);
			}
		});
	}

	Position.createPositionArray = function(positionArray, data, i, cb){
		if (i < data.position.length){
			var positionData = data.position[i];
			positionData.postId = data.postId;
			Position.create(positionData, function(err, position){
				if (err){
					console.log(err);
					cb(err, null);
				} else{
					console.log("Position created: ", position);
					positionArray.push(position);
					Position.createPositionArray(positionArray, data, i+1, cb);
				}
			});
		} else{
			cb(null, positionArray);
		}
	}

	Position.applyPosition = function(data, cb){
		var ctx = loopback.getCurrentContext();
		// var accessToken = ctx.get('accessToken');
		// console.log(accessToken);
    	var currentUser = ctx && ctx.get('currentUser');
    	// console.log(currentUser);

    	Position.findById(data.positionId, function(err, position){
    		if (err){
    			console.log(err);
    			cb(err, null);
    		} else{
    			if (position.memberId == null){
	    			var positionData = {};
	    			positionData.memberId = currentUser.id;
	    			position.updateAttributes(positionData, function(err, position){
	    				if (err){
	    					console.log(err);
	    					cb(err, null);
	    				} else{
	    					position.member(function(err, member){
	    						if (err){
	    							console.log(err);
	    							cb(err, null);
	    						} else{
	    							position.applicant = member.username;
	    							console.log("Position Applied: ", position);
	    							cb(null, position);
	    						}
	    					});
	    				}
	    			});
	    		} else{
	    			console.log("Fail to Apply Position: ", position);
	    			cb(null, null);
	    		}
    		}
    	});
	}

	Position.getPosition = function(data, cb){
		Position.find(data, function(err, position){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				var positionArray = new Array();
				Position.getPositionArray(positionArray, position, 0, function(err, positionArray){
					if (err){
						console.log(err);
						cb(err, null);
					} else{
						console.log("Get Position(s): ", positionArray);
						cb(null, positionArray);
					}
				});
			}
		});
	}

	Position.getPositionArray = function(positionArray, position, i, cb){
		if (i < position.length){
			var positionObj = position[i];
			position[i].member(function(err, mem){
				if (err){
					console.log(err);
					cb(err, null);
				} else{
					if (mem != null){
						positionObj.applicant = mem.username;
						positionObj.jobtitle = mem.jobtitle;
						positionObj.description = mem.description;
						positionObj.image = mem.image;
					}
					positionArray.push(positionObj);
					Position.getPositionArray(positionArray, position, i+1, cb);
				}
			});
		} else{
			cb(null, positionArray);
		}
	}

	Position.remoteMethod('createPosition', {
		http: {path: '/createPosition', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'position', type: 'object'}
	});

	Position.remoteMethod('applyPosition', {
		http: {path: '/applyPosition', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'position', type: 'object'}
	});

	Position.remoteMethod('getPosition', {
		http: {path: '/getPosition', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'position', type: 'object'}
	});

};
