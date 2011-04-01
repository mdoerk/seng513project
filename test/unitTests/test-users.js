/* Tests for users.js 
 */
 
var users = require('../../node_modules/users');
var testCase = require('nodeunit/nodeunit').testCase;

module.exports = testCase({
	setUp: function(callback) {
		callback();
	},
	 
	tearDown: function(callback) {
		callback();
	},
	
	testGetIdFromUsername: function(test) {
		users.getIdFromUsername('Virginia Snyder', function(error, id) { 
			test.ifError(error); 
			test.equals(id, 1); 
			test.done();
		}); 
	},
	
	testGetUsernameFromId: function(test) {
		users.getUsernameFromId(1, function(error, name) { 
			test.ifError(error); 
			test.equals(name, 'Virginia Snyder'); 
			test.done();
		}); 
	},
	
	testGetUserFollowers: function(test) { 
		users.getUserFollowers(1, function(error, results) { 
			test.ifError(error); 
			test.equals(results.length, 1); 
			test.equals(results[0], 2); 
			test.done(); 
		}); 
	},
	
	testGetFollowedUsers: function(test) { 
		users.getFollowedUsers(2, function(error, results) { 
			test.ifError(error); 
			test.equals(results.length, 1); 
			test.equals(results[0], 1); 
			test.done(); 
		}); 
	},
	
	testIsUserFollowedByUser: function(test) { 
		users.isUserFollowedByUser(1, 2, function(error, result) { 
			test.ifError(error); 
			test.equals(result, true); 
			test.done(); 
		}); 
	},
	
	testIsUserNotFollowedByUser: function(test) { 
		users.isUserFollowedByUser(2, 1, function(error, result) { 
			test.ifError(error); 
			test.equals(result, false); 
			test.done(); 
		}); 
	},
	
	testFollowUser: function(test) { 
		users.followUser(3, 5, function(err1) { 
			test.ifError(err1);
			users.isUserFollowedByUser(5, 3, function(err2, isFollowed1) { 
				test.ifError(err2); 
				test.equals(isFollowed1, true); 
				users.unfollowUser(3, 5, function(err3) { 
					test.ifError(err3);
					users.isUserFollowedByUser(5, 3, function(err4, isFollowed2) { 
						test.ifError(err4); 
						test.equals(isFollowed2, false); 
						test.done();
					});
				}); 
			});
		}); 
	},
	
	testFollowOwnUser: function(test) { 
		users.followUser(5, 5, function(err1) { 
			test.notEqual(err1, null); 
			test.done(); 
		}); 
	}, 
	
	testFollowingUserTwice: function(test) { 
		users.followUser(3, 5, function(err1) { 
			test.ifError(err1);
			users.followUser(3, 5, function(err1) { 
				test.notEqual(err1, null); 
				users.unfollowUser(3, 5, function(err3) { 
					test.ifError(err3);
					test.done(); 
				}); 
			}); 
		}); 
	},
	
	testUnfollowOnUnfollowedUser: function(test) { 
		users.unfollowUser(5, 3, function(err1) { 
			test.ifError(err1);
			test.done(); 
		}); 
	}
});
