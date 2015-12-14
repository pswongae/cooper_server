module.exports = function(Tag) {

	Tag.createTag = function(data, cb){
		Tag.create(data, function(err, tag){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				cb(null, tag);
			}
		});
	}

	Tag.getTag = function(data, cb){
		Tag.find(data, function(err, tag){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				var tagArray = new Array();
				Tag.getTagArray(tagArray, tag, 0, function(err, tagArray){
					if (err){
						console.log(err);
						cb(err, null);
					} else{
						console.log("Get tag(s): ", tagArray);
						cb(null, tagArray);
					}
				});
			}
		});
	}

	Tag.getTagArray = function(tagArray, tag, i, cb){
		if (i < tag.length){
			var tagObj = tag[i];
			tag[i].post(function(err, post){
				if (err){
					console.log(err);
					cb(err, null);
				} else{
					tagObj.post_title = post.title;
					var mDate = new Date(Date.parse(post.last_modified_time));
					tagObj.date = mDate.getDate().toString() + " - " + 
						(mDate.getMonth()+1).toString() + " - " + mDate.getFullYear().toString();
					tagObj.time = mDate.getHours().toString() + " : " + 
						mDate.getMinutes().toString() + " : " + mDate.getSeconds().toString();
					if (!tagObj.is_post){
						tag[i].comment(function(err, comment){
							if (err){
								console.log(err);
								cb(err, null);
							} else{
								tagObj.comment_content = comment.content;
								tagObj.category = comment.category;
								var mDate = new Date(Date.parse(comment.last_modified_time));
								tagObj.date = mDate.getDate().toString() + " - " + 
									(mDate.getMonth()+1).toString() + " - " + mDate.getFullYear().toString();
								tagObj.time = mDate.getHours().toString() + " : " + 
									mDate.getMinutes().toString() + " : " + mDate.getSeconds().toString();
								tagArray.push(tagObj);
								Tag.getTagArray(tagArray, tag, i+1, cb);
							}
						});
					} else{
						tagArray.push(tagObj);
						Tag.getTagArray(tagArray, tag, i+1, cb);
					}
				}
			});
		} else{
			cb(null, tagArray);
		}
	}

	Tag.remoteMethod('createTag', {
		http: {path: '/createTag', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'tag', type: 'object'}
	});

	Tag.remoteMethod('getTag', {
		http: {path: '/getTag', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'tag', type: 'object'}
	});

};
