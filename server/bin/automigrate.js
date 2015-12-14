var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var loopback = require('loopback');

var dataSource = app.dataSources.mySQL;

var postData1 = {
  "title": "Developing an idea sharing platform",
  "categories": [
     {
      "name": "General",
      "description": "Here is the 'General' information",
      "tag": [
        "tag a1",
        "tag a2"
      ]
     },
     {
      "name": "Technical",
      "description": "Here is the 'Technical' information",
      "tag": [
        "tag b1",
        "tag b2",
        "tag b3"
      ]
     },
     {
      "name": "Financial",
      "description": "Here is the 'Financial' information",
      "tag": [
        "tag c1"
      ]
     },
     {
      "name": "Others",
      "description": "Here is the 'Others' information",
      "tag": [
        "tag d1",
        "tag d2",
        "tag d3"
      ]
     }
  ],
  "tag": [
    "App",
    "Idea Sharing"
  ],
  "memberId": 2,
  "view_num": 200,
  "like_num": 13
};

var postData2 = {
  "title": "Start a cafe shop in Hong Kong",
  "categories": [
     {
      "name": "General",
      "description": "Here is the 'General' information",
      "tag": [
        "tag a1",
        "tag a2"
      ]
     },
     {
      "name": "Technical",
      "description": "Here is the 'Technical' information",
      "tag": [
        "tag b1",
        "tag b2",
        "tag b3"
      ]
     },
     {
      "name": "Financial",
      "description": "Here is the 'Financial' information",
      "tag": [
        "tag c1"
      ]
     },
     {
      "name": "Others",
      "description": "Here is the 'Others' information",
      "tag": [
        "tag d1",
        "tag d2",
        "tag d3"
      ]
     }
  ],
  "tag": [
    "Cafe"
  ],
  "memberId": 3,
  "view_num": 2459,
  "like_num": 494
};

var postData3 = {
  "title": "COMP4901E - Group project",
  "categories": [
     {
      "name": "General",
      "description": "Here is the 'General' information",
      "tag": [
        "tag a1",
        "tag a2"
      ]
     },
     {
      "name": "Technical",
      "description": "Here is the 'Technical' information",
      "tag": [
        "tag b1",
        "tag b2",
        "tag b3"
      ]
     },
     {
      "name": "Financial",
      "description": "Here is the 'Financial' information",
      "tag": [
        "tag c1"
      ]
     },
     {
      "name": "Others",
      "description": "Here is the 'Others' information",
      "tag": [
        "tag d1",
        "tag d2",
        "tag d3"
      ]
     }
  ],
  "tag": [
    "HKUST",
    "COMP4901E",
    "App"
  ],
  "memberId": 4,
  "view_num": 2350,
  "like_num": 52
};

var postData4 = {
  "title": "Photoshooting gallary",
  "categories": [
     {
      "name": "General",
      "description": "Here is the 'General' information",
      "tag": [
        "tag a1",
        "tag a2"
      ]
     },
     {
      "name": "Technical",
      "description": "Here is the 'Technical' information",
      "tag": [
        "tag b1",
        "tag b2",
        "tag b3"
      ]
     },
     {
      "name": "Financial",
      "description": "Here is the 'Financial' information",
      "tag": [
        "tag c1"
      ]
     },
     {
      "name": "Others",
      "description": "Here is the 'Others' information",
      "tag": [
        "tag d1",
        "tag d2",
        "tag d3"
      ]
     }
  ],
  "tag": [
    "App",
    "Gallary"
  ],
  "memberId": 5,
  "view_num": 2200,
  "like_num": 757
};

var commData1 = {
  "content": "comment 1 of General",
  "category": "General",
  "tag": [
    "tag1",
    "tag2",
    "tag3"
  ],
  "memberId": 4
};

var commData2 = {
  "content": "comment 2 of General",
  "category": "General",
  "tag": [
    "tag1",
    "tag2",
    "tag3"
  ],
  "memberId": 3
};

var commData3 = {
  "content": "comment 1 of Technical",
  "category": "Technical",
  "tag": [
    "tag1",
    "tag2",
    "tag3"
  ],
  "memberId": 5
};

dataSource.automigrate('post', function(err) {
  if(err) throw err;
  console.log("post");

  dataSource.automigrate('comment', function(err) {
    if(err) throw err;
    console.log("comment");

    dataSource.automigrate('tag', function(err) {
      if(err) throw err;
      console.log("tag");

      dataSource.automigrate('position', function(err) {
        if(err) throw err;
        console.log("position");

        dataSource.automigrate('like', function(err) {
          if(err) throw err;
          console.log("like");

            dataSource.automigrate('view', function(err) {
              if(err) throw err;
              console.log("view");

              // dataSource.automigrate('member', function(err) {
              //   if(err) throw err;
              //   console.log("member");

                var Post = app.models.Post;
                var Comment = app.models.Comment;

                Post.createPost(postData1, function(err, post){
                  if (err) console.log(err);
                    commData1.postId = post.id;
                    Comment.createComment(commData1, function(err, comment){
                      if (err) console.log(err);
                        commData2.postId = post.id;
                        Comment.createComment(commData2, function(err, comment){
                          if (err) console.log(err);
                            commData3.postId = post.id;
                            Comment.createComment(commData3, function(err, comment){
                              if (err) console.log(err);

                            });
                        });
                    });
                    Post.createPost(postData2, function(err, post){
                      if (err) console.log(err);
                        commData1.postId = post.id;
                        Comment.createComment(commData1, function(err, comment){
                          if (err) console.log(err);
                            commData3.postId = post.id;
                            Comment.createComment(commData3, function(err, comment){
                              if (err) console.log(err);

                            });
                        });
                        Post.createPost(postData3, function(err, post){
                          if (err) console.log(err);
                          Post.createPost(postData4, function(err, post){
                            if (err) console.log(err);

                          });
                        });
                    });
                });

              // });
          });

        });

      });

    });

  });

});

// dataSource.automigrate('test', function(err) {
//   if(err) throw err;
//   console.log("test");

// });
