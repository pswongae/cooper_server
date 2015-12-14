var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var loopback = require('loopback');

module.exports = function(Position) {

	// Position.createPosition = function(data, cb){
	// 	var ctx = loopback.getCurrentContext();
	// 	// var accessToken = ctx.get('accessToken');
	// 	// console.log(accessToken);
	// 	var currentUser = ctx && ctx.get('currentUser');
	// 	// console.log(currentUser);


	// }

	// Position.remoteMethod('createPosition', {
	// 	http: {path: '/createPosition', verb: 'post'},
	// 	accepts: {arg: 'data', type: 'object', http:{source:'body'}},
	// 	returns: {arg: 'position', type: 'object'}
	// });

};
