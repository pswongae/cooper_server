# Remote Method (except register, login, logout)

## createPost
### Parameter
	{
	  "title": "string",
	  "categories": [
	     {
	      "name": "cat a",
	      "description": "des a",
	      "tag": [
	        "tag a1",
	        "tag a2",
	        "tag a3"
	      ]
	     },
	     {
	      "name": "cat b",
	      "description": "des b",
	      "tag": [
	        "tag b1",
	        "tag b2",
	        "tag b3"
	      ]
	     },
	     {
	      "name": "cat c",
	      "description": "des c",
	      "tag": [
	        "tag c1",
	        "tag c2",
	        "tag c3"
	      ]
	     },
	     {
	      "name": "cat d",
	      "description": "des d",
	      "tag": [
	        "tag d1",
	        "tag d2",
	        "tag d3"
	      ]
	     },
	     {
	      "name": "cat e",
	      "description": "des e",
	      "tag": [
	        "tag e1",
	        "tag e2",
	        "tag e3"
	      ]
	     }
	  ],
	  "tag": [
	    "tag1",
	    "tag2",
	    "tag3"
	  ]
	}
### Return
	{
	  "post": {
	    "title": "string",
	    "create_time": "2015-12-14T14:06:57.056Z",
	    "last_modified_time": "2015-12-14T14:06:57.056Z",
	    "is_recruiting": true,
	    "categories": [
	      "cat a",
	      "cat b",
	      "cat c",
	      "cat d",
	      "cat e"
	    ],
	    "view_num": 0,
	    "like_num": 0,
	    "id": 5,
	    "memberId": 3
	  }
	}

## getPost
### Parameter
	{
	  "where": {
	    "id": 3
	  }
	}
### Return
	{
	  "post": [
	    {
	      "title": "COMP4901E - Group project",
	      "create_time": "2015-12-14T13:51:37.000Z",
	      "last_modified_time": "2015-12-14T13:51:37.000Z",
	      "is_recruiting": true,
	      "categories": [
	        "General",
	        "Technical",
	        "Financial",
	        "Others"
	      ],
	      "view_num": 2350,
	      "like_num": 52,
	      "id": 3,
	      "memberId": 4,
	      "date": "14 - 12 - 2015",
	      "time": "21 : 51 : 37",
	      "author": "Elvis Wong"
	    }
	  ]
	}
### Parameter
	{}
### Return
	{
	  "post": [
	    {
	      "title": "Developing an idea sharing platform",
	      "create_time": "2015-12-14T13:51:37.000Z",
	      "last_modified_time": "2015-12-14T13:51:37.000Z",
	      "is_recruiting": true,
	      "categories": [
	        "General",
	        "Technical",
	        "Financial",
	        "Others"
	      ],
	      "view_num": 200,
	      "like_num": 13,
	      "id": 1,
	      "memberId": 2,
	      "date": "14 - 12 - 2015",
	      "time": "21 : 51 : 37",
	      "author": "Nelson Cheung"
	    },
	    {
	      "title": "Start a cafe shop in Hong Kong",
	      "create_time": "2015-12-14T13:51:37.000Z",
	      "last_modified_time": "2015-12-14T13:51:37.000Z",
	      "is_recruiting": true,
	      "categories": [
	        "General",
	        "Technical",
	        "Financial",
	        "Others"
	      ],
	      "view_num": 2459,
	      "like_num": 494,
	      "id": 2,
	      "memberId": 3,
	      "date": "14 - 12 - 2015",
	      "time": "21 : 51 : 37",
	      "author": "Sam Wong"
	    },
	    {
	      "title": "COMP4901E - Group project",
	      "create_time": "2015-12-14T13:51:37.000Z",
	      "last_modified_time": "2015-12-14T13:51:37.000Z",
	      "is_recruiting": true,
	      "categories": [
	        "General",
	        "Technical",
	        "Financial",
	        "Others"
	      ],
	      "view_num": 2350,
	      "like_num": 52,
	      "id": 3,
	      "memberId": 4,
	      "date": "14 - 12 - 2015",
	      "time": "21 : 51 : 37",
	      "author": "Elvis Wong"
	    },
	    ...
	    ...
	    ...
	  ]
	}

## editPost
### Parameter
	{
	  "id": 4,
	  "title": "changed title"
	}
### Return
	{
	  "post": {
	    "title": "changed title",
	    "create_time": "2015-12-14T13:51:37.000Z",
	    "last_modified_time": "2015-12-14T14:18:49.123Z",
	    "is_recruiting": true,
	    "categories": [
	      "General",
	      "Technical",
	      "Financial",
	      "Others"
	    ],
	    "view_num": 2200,
	    "like_num": 757,
	    "id": 4,
	    "memberId": 5
	  }
	}

## createComment
### Parameter
	{
	  "content": "Hello",
	  "category": "cat a",
	  "tag": [
	    "tag1",
	    "tag2",
	    "tag3"
	  ],
	  "postId": 5
	}
### Return
	{
	  "comment": {
	    "content": "Hello",
	    "create_time": "2015-12-14T14:21:54.632Z",
	    "last_modified_time": "2015-12-14T14:21:54.632Z",
	    "category": "cat a",
	    "id": 27,
	    "memberId": 3,
	    "postId": 5
	  }
	}

## getComment
### Parameter
	{
	  "where": {
	    "id": 3
	  }
	}
### Return
	{
	  "comment": [
	    {
	      "content": "Here is the 'Technical' information",
	      "create_time": "2015-12-14T13:51:37.000Z",
	      "last_modified_time": "2015-12-14T13:51:37.000Z",
	      "category": "Technical",
	      "id": 3,
	      "memberId": 2,
	      "postId": 1,
	      "date": "14 - 12 - 2015",
	      "time": "21 : 51 : 37",
	      "author": "Nelson Cheung",
	      "authorTitle": "a"
	    }
	  ]
	}
### Parameter
	{}
### Return
	{
	  "comment": [
	    {
	      "content": "Here is the 'General' information",
	      "create_time": "2015-12-14T13:51:37.000Z",
	      "last_modified_time": "2015-12-14T13:51:37.000Z",
	      "category": "General",
	      "id": 1,
	      "memberId": 2,
	      "postId": 1,
	      "date": "14 - 12 - 2015",
	      "time": "21 : 51 : 37",
	      "author": "Nelson Cheung",
	      "authorTitle": "a"
	    },
	    {
	      "content": "Here is the 'Financial' information",
	      "create_time": "2015-12-14T13:51:37.000Z",
	      "last_modified_time": "2015-12-14T13:51:37.000Z",
	      "category": "Financial",
	      "id": 2,
	      "memberId": 2,
	      "postId": 1,
	      "date": "14 - 12 - 2015",
	      "time": "21 : 51 : 37",
	      "author": "Nelson Cheung",
	      "authorTitle": "a"
	    },
	    ...
	    ...
	    ...
	  ]
	}

## editComment
### Parameter
	{
	  "id": 4,
	  "content": "changed content"
	}
### Return
	{
	  "comment": {
	    "content": "changed content",
	    "create_time": "2015-12-14T13:51:37.000Z",
	    "last_modified_time": "2015-12-14T14:26:13.544Z",
	    "category": "Others",
	    "id": 4,
	    "memberId": 2,
	    "postId": 1
	  }
	}

## getTag
### Parameter
	{
	  "where": {
	    "name": "tag a1",
	    "is_post": false
	  }
	}
### Return
	{
	  "tag": [
	    {
	      "name": "tag a1",
	      "is_post": false,
	      "id": 1,
	      "postId": 1,
	      "commentId": 1,
	      "post_title": "Developing an idea sharing platform",
	      "date": "14 - 12 - 2015",
	      "time": "21 : 51 : 37",
	      "comment_content": "Here is the 'General' information",
	      "category": "General"
	    },
	    {
	      "name": "tag a1",
	      "is_post": false,
	      "id": 20,
	      "postId": 2,
	      "commentId": 6,
	      "post_title": "Start a cafe shop in Hong Kong",
	      "date": "14 - 12 - 2015",
	      "time": "21 : 51 : 37",
	      "comment_content": "Here is the 'General' information",
	      "category": "General"
	    },
	    ...
	    ...
	  ]
	}
### Parameter
	{
	  "where": {
	    "name": "tag a1",
	    "is_post": false,
	    "postId": 2
	  }
	}
### Return
	{
	  "tag": [
	    {
	      "name": "tag a1",
	      "is_post": false,
	      "id": 20,
	      "postId": 2,
	      "commentId": 6,
	      "post_title": "Start a cafe shop in Hong Kong",
	      "date": "14 - 12 - 2015",
	      "time": "21 : 51 : 37",
	      "comment_content": "Here is the 'General' information",
	      "category": "General"
	    },
	    ...
	    ...
	  ]
	}

## isLiked
### Parameter
	{
	  "postId": 1
	}
### Return
if not liked before, then return null

	{
	  "like": null
	}

if already liked before, then return like

	{
	  "like": {
	    "id": 2,
	    "postId": 1,
	    "memberId": 3
	  }
	}

## clickLike
### Parameter
	{
	  "postId": 1
	}
### Return
if not liked before and click like, then like

	{
	  "like": {
	    "id": 1,
	    "postId": 1,
	    "memberId": 3
	  }
	}

if already liked before and click like, then cancel the like

	{
	  "like": "Cancelled"
	}

## addView
### Parameter
	{
	  "postId": 1
	}
### Return
if not viewed before and current user is not the post admin, then add view count

	{
	  "view": {
	    "id": 1,
	    "postId": 1,
	    "memberId": 3
	  }
	}

if viewed before or current user is post admin, then do nothing on view count

	{
	  "view": "Already viewed"
	}

## createPosition
### Parameter
	{
	  "postId": 1,
	  "position":[
	    {
	      "title": "title 1",
	      "requirement": "requirement 1"
	    },
	    {
	      "title": "title 2",
	      "requirement": "requirement 2"
	    },
	    {
	      "title": "title 3",
	      "requirement": "requirement 3"
	    },
	    {
	      "title": "title 4",
	      "requirement": "requirement 4"
	    }
	  ]
	}
### Return
	{
	  "position": [
	    {
	      "title": "title 1",
	      "requirement": "requirement 1",
	      "id": 1,
	      "postId": 1
	    },
	    {
	      "title": "title 2",
	      "requirement": "requirement 2",
	      "id": 2,
	      "postId": 1
	    },
	    {
	      "title": "title 3",
	      "requirement": "requirement 3",
	      "id": 3,
	      "postId": 1
	    },
	    {
	      "title": "title 4",
	      "requirement": "requirement 4",
	      "id": 4,
	      "postId": 1
	    }
	  ]
	}

## getPosition
### Parameter
	{
	  "postId": 1
	}
### Return
	{
	  "position": [
	    {
	      "title": "title 1",
	      "requirement": "requirement 1",
	      "id": 1,
	      "postId": 1,
	      "memberId": 3,
	      "applicant": "Sam Wong",
	      "jobtitle": "a",
	      "description": "b",
	      "image": null
	    },
	    {
	      "title": "title 2",
	      "requirement": "requirement 2",
	      "id": 2,
	      "postId": 1,
	      "memberId": null
	    },
	    {
	      "title": "title 3",
	      "requirement": "requirement 3",
	      "id": 3,
	      "postId": 1,
	      "memberId": null
	    },
	    {
	      "title": "title 4",
	      "requirement": "requirement 4",
	      "id": 4,
	      "postId": 1,
	      "memberId": null
	    }
	  ]
	}
## applyPosition
### Parameter
	{
	  "positionId": 1
	}
### Return
if position is not applied by other user

	{
	  "position": {
	    "title": "title 1",
	    "requirement": "requirement 1",
	    "id": 1,
	    "postId": 1,
	    "memberId": 3,
	    "applicant": "Sam Wong"
	  }
	}

if position is already applied by other user

	{
	  "position": null
	}

## Add oil!!!