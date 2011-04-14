/* test-reputation.js 
 * Tests functionality of reputation module   
 */ 
 
var reputation = require('../../node_modules/reputation'),
	dbAccess = require('../../node_modules/dbAccess'),
	testCase = require('nodeunit/nodeunit').testCase;

var userId, issueId, commentId; 
module.exports = testCase({
	setUp: function (callback) {
		dbAccess.create('users', { values: [ 'name="RepTestUser"', 'email="RepTestUser"',
			'reputation_score="0"', 'password="5f4dcc3b5aa765d61d8327deb882cf99"' ] }, 
			function(error, createdUserId) {
				userId = createdUserId; 
				dbAccess.create('issues', { values: [ 'user_id="' + createdUserId + '"' ] }, function(error, createdIssueId) {
					issueId = createdIssueId;
					dbAccess.create('comments', { values: [ 'user_id="' + createdUserId + '"', 
						'issue_id="' + createdIssueId + '"' ] }, 
						function(error, createdCommentId) {
							commentId = createdCommentId;
							callback();
					});
				});
		}); 
	},
	 
	tearDown: function (callback) {
		dbAccess.remove('comments', { conditions: [ 'id="' + commentId + '"' ] }, function(error) { 
			dbAccess.remove('issues', { conditions: [ 'id="' + issueId + '"' ] }, function(error) { 
				dbAccess.remove('users', { conditions: [ 'id="' + userId + '"' ] }, function(error) { 
					callback();
				});
			});
		}); 
	},
	
	testGetReputation: function (test) {		
		reputation.getReputation(userId, function(error, rep) { 
			test.ifError(error);
			test.equals(rep, 0);
			test.done();
		}); 
	},
	
	testUpdateOnSignUp: function (test) {		
		reputation.updateOnSignUp('RepTestUser', 'RepTestUser', function(err) { 
			test.ifError(err); 
			reputation.getReputation(userId, function(error, rep) { 
				test.ifError(error);
				test.equals(rep, 10);
				test.done();
			}); 	
		}); 
	},
	
	testUpdateOnAddIssue: function (test) {
		reputation.updateOnAddIssue(issueId, userId, function(err) { 
			test.ifError(err); 
			reputation.getReputation(userId, function(error, rep) { 
				test.ifError(error);
				test.equals(rep, 5);
				test.done();
			}); 			
		}); 
	},
	
	testUpdateOnIssueUpVote: function (test) {
		reputation.updateOnIssueUpVote(issueId, userId, function(err) { 
			test.ifError(err);
			reputation.getReputation(userId, function(error, rep) { 
				test.ifError(error);
				test.equals(rep, 2);
				test.done();
			}); 		
		}); 
	},
	
	testUpdateOnIssueUpVote: function (test) {
		reputation.updateOnIssueUpVote(issueId, userId, function(err) { 
			test.ifError(err);
			reputation.getReputation(userId, function(error, rep) { 
				test.ifError(error);
				test.equals(rep, 2);
				test.done();
			}); 		
		}); 
	},
	
	testUpdateOnIssueUpVoteMaximumScoreReached: function (test) {
		dbAccess.update('users', { values: ['reputation_score="100000"'], 
		conditions: [ 'id="' + userId + '"' ] }, function(setupErr) {
			test.ifError(setupErr);
			reputation.updateOnIssueUpVote(issueId, userId, function(err) { 
				test.ifError(err);
				reputation.getReputation(userId, function(error, rep) { 
					test.ifError(error);
					test.equals(rep, 100000);
					test.done();
				});
			});
		});
	},
	
	testUpdateOnIssueDownVoteMinimumScore: function (test) {
		reputation.updateOnIssueDownVote(issueId, userId, function(err) { 
			test.ifError(err);
			reputation.getReputation(userId, function(error, rep) { 
				test.ifError(error);
				test.equals(rep, 0);
				test.done(); 
			});
		}); 
	},
	
	testUpdateOnIssueDownVote: function (test) {
		dbAccess.update('users', { values: ['reputation_score="10"'], 
		conditions: [ 'id="' + userId + '"' ] }, function(setupErr) {
			test.ifError(setupErr);
			reputation.updateOnIssueDownVote(issueId, userId, function(err) { 
				test.ifError(err);
				reputation.getReputation(userId, function(error, rep) { 
					test.ifError(error);
					test.equals(rep, 8);
					test.done();
				});
			});
		});
	},
	
	testUpdateOnCommentUpVote: function (test) {
		reputation.updateOnCommentUpVote(commentId, userId, function(err) { 
			test.ifError(err);
			reputation.getReputation(userId, function(error, rep) { 
				test.ifError(error);
				test.equals(rep, 2);
				test.done(); 			
			}); 		
		}); 
	},
	
	testUpdateOnCommentDownVoteMinimumScore: function (test) {
		reputation.updateOnCommentDownVote(commentId, userId, function(err) { 
			test.ifError(err);
			reputation.getReputation(userId, function(error, rep) { 
				test.ifError(error);
				test.equals(rep, 0);
				test.done(); 			
			});
		}); 
	},
	
	testUpdateOnCommentDownVote: function (test) {
		dbAccess.update('users', { values: ['reputation_score="10"'], 
		conditions: [ 'id="' + userId + '"' ] }, function(setupErr) {
			test.ifError(setupErr);
			reputation.updateOnCommentDownVote(commentId, userId, function(err) { 
				test.ifError(err);
				reputation.getReputation(userId, function(error, rep) { 
					test.ifError(error);
					test.equals(rep, 8);
					test.done(); 			
				});
			});
		});
	},
	
	testUpdateOnAddCommentShortComment: function (test) {
		dbAccess.update('users', { values: ['reputation_score="10"'], 
		conditions: [ 'id="' + userId + '"' ] }, function(setupErr) {
			reputation.updateOnAddComment(issueId, userId, 'lol', function(err) { 
				test.ifError(err);
				reputation.getReputation(userId, function(error, rep) { 
					test.ifError(error);
					test.equals(rep, 11);
					test.done(); 			
				});
			}); 
		});
	},
	
	testUpdateOnAddCommentLongComment: function (test) {
		dbAccess.update('users', { values: ['reputation_score="10"'], 
		conditions: [ 'id="' + userId + '"' ] }, function(setupErr) {
			var cmt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis'; 
			reputation.updateOnAddComment(issueId, userId, cmt, function(err) { 
				test.ifError(err);
				reputation.getReputation(userId, function(error, rep) { 
					test.ifError(error);
					test.equals(rep, 12);
					test.done(); 			
				});
			}); 
		});
	}
});
