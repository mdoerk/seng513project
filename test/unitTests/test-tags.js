/* tags.js 
 *
 * Provides functions for tagging issues
 * Dori Saba
 * sabad66@hotmail.com
 * March 3, 2011
 */

var testCase = require('nodeunit/nodeunit').testCase,
	tags = require('../../node_modules/tags'),
	dbAccess = require('../../node_modules/dbAccess'),
	util = require('util');

module.exports = testCase({
	setUp: function (callback) {
		callback();
	},
	
	tearDown: function (callback) {
		callback();
	},
	
	testGetTagId: function(test) {
		// First add a new unique tag
		var d = new Date();
		var t1 = d.getTime();
		tags.addTag(t1, function(error, t1Id) {
			test.ifError(error);
			test.notEqual(t1Id, -1); // id will be -1 if there was an error
			// Now look up the tag, and compare it with the id
			tags.getTagId(t1, function(error, t1LookUpId) {
				test.ifError(error);
				test.equal(t1LookUpId, t1Id);
				// Now look up one that doesn't exist, make sure it returns -1
				tags.getTagId(t1 + 'x', function(error, t2Id) {
					test.ifError(error);
					test.equal(t2Id, -1);
					// Clean up (delete the tag we just made)
					dbAccess.remove('tags', { conditions:['id="' + t1Id + '"'] }, function (error) {
						test.ifError(error);
						test.done();
					});
				});
			});
		});
	},
	
	testAddTag: function(test) {
		// Make a unique tag
		var d = new Date();
		var t1 = d.getTime();
		tags.addTag(t1, function(error, t1Id) {
			test.ifError(error);
			test.notEqual(t1Id, -1); // id will be -1 if there was an error
			// Add another unique tag
			var t2 = t1 + 'x';
			tags.addTag(t2, function(error, t2Id) {
				test.ifError(error);
				// Ensure this one isn't -1, and isn't the same as t1's id
				test.notEqual(t2Id, -1);
				test.notEqual(t2Id, t1Id);
				// Try to add t1 again
				tags.addTag(t1, function (error, t3Id) {
					test.ifError(error);
					// Ensure it isn't -1, but that it does match t1's id
					test.notEqual(t3Id, -1);
					test.equal(t3Id, t1Id);
					// Clean up - delete the two tags we just made
					dbAccess.remove('tags', { conditions:['id="' + t1Id + '" OR id="' + t2Id + '"'] }, function (error) {
						test.ifError(error);
						test.done();
					});
				});
			});
		});
	},
	
	testGetTags: function(test) {
		// First create a new issue
		dbAccess.create('issues', { values: ['user_id="332338"',
											'status="online"',
											'title="myissue"',
											'description="desc"',
											'link=""',
											'location="NE"']}, function(error, issueId) {
			test.ifError(error);
			// Now tag it
			var sampleTags = 'tag2 tag1 tag3';
			tags.tagIssue(issueId, sampleTags, function (error) {
				test.ifError(error);
				// // Now call getTags on this issue, and ensure that it returns the right thing
				tags.getTags(issueId, function(error, results) {
					test.ifError(error);
					test.equal(results.length, 3);
					test.equal(results[0].tag, 'tag1');
					test.equal(results[1].tag, 'tag2');
					test.equal(results[2].tag, 'tag3');
					// Clean up - delete the 3 tags, delete the issue, untag the issue
					dbAccess.remove('issues', { conditions:['id="' + issueId + '"'] }, function (error) {
						test.ifError(error);
						tags.untagIssue(issueId, function(error) {
							test.ifError(error);
							// TODO: delete the 3 tags
							test.done();
						});
					});
				});
			});
		});
	},
	
	testTagIssue: function(test) {
		// First create a new issue
		dbAccess.create('issues', { values: ['user_id="332338"',
											'status="online"',
											'title="myissue"',
											'description="desc"',
											'link=""',
											'location="NE"']}, function(error, issueId) {
			test.ifError(error);
			// Now tag it
			var sampleTags = 'tag1 tag2 tag3';
			tags.tagIssue(issueId, sampleTags, function (error) {
				test.ifError(error);
				// Clean up - delete the 3 tags, delete the issue, untag issue
				dbAccess.remove('issues', { conditions:['id="' + issueId + '"'] }, function (error) {
					test.ifError(error);
					tags.untagIssue(issueId, function(error) {
						test.ifError(error);
						// TODO: delete the 3 tags
						test.done();
					});
				});
			});
		});
	},
	testGetTagsList: function(test) {
		// First create a new issue
		dbAccess.create('issues', 
		{ values: ['user_id="332338"', 'status="online"', 'title="myissue"', 'description="desc"', 'link=""', 'location="NE"']},
		function(error, issueId) {
			test.ifError(error);
			// Now tag it
			var sampleTags = 'tag2 tag1 tag3'; // not in alphabetical order
			tags.tagIssue(issueId, sampleTags, function (error) {
				test.ifError(error);
				// Now call getTagsList on this issue, and ensure that it is what we expect
				tags.getTagsList(issueId, function(results) {
					test.equal(results.length, 3);
					//test.equal(results, sampleTags.split(' ')); // unfortunately this doesn't work :(
					test.equal(results[0], 'tag1'); // ensure it sends it back in alphabetical order (i.e tag1 is before tag2)
					test.equal(results[1], 'tag2');
					test.equal(results[2], 'tag3');
					// Clean up - delete the 3 tags, delete the issue, untag issue
					dbAccess.remove('issues', { conditions:['id="' + issueId + '"'] }, function (error) {
						test.ifError(error);
						tags.untagIssue(issueId, function(error) {
							test.ifError(error);
							// TODO: delete the 3 tags
							test.done();
						});
					});
				});
			});
		});
	},
	testGetTagsString: function(test) {
		// First create a new issue
		dbAccess.create('issues', 
		{ values: ['user_id="332338"', 'status="online"', 'title="myissue"', 'description="desc"', 'link=""', 'location="NE"']},
		function(error, issueId) {
			test.ifError(error);
			// Now tag it
			var sampleTags = 'tag2 tag1 tag3'; // Not in alphabetical order
			tags.tagIssue(issueId, sampleTags, function (error) {
				test.ifError(error);
				// Now call getTagsString on this issue, and ensure that it is what we expect
				tags.getTagsString(issueId, function(result) {
					test.equal(result, 'tag1 tag2 tag3'); // Make sure it returns them in alphabetical order
					// Clean up - delete the 3 tags, delete the issue, untag the issue
					dbAccess.remove('issues', { conditions:['id="' + issueId + '"'] }, function (error) {
						test.ifError(error);
						tags.untagIssue(issueId, function(error) {
							test.ifError(error);
							// TODO: delete the 3 tags
							test.done();
						});
					});
				});
			});
		});
	},
	testGetIssuesByTag: function(test) {
		// First create a new issue
		dbAccess.create('issues', 
		{ values: ['user_id="332338"', 'status="online"', 'title="myissue"', 'description="desc"', 'link=""', 'location="NE"']},
		function(error, issueId) {
			test.ifError(error);
			// Now tag it with a unique tag
			var t1 = '';
			var d = new Date();
			t1 += d.getTime();
			tags.tagIssue(issueId, t1, function (error) {
				test.ifError(error);
				// Now call getIssuesByTag using one of the tags, and ensure that the issueId is in the list of issues returned
				tags.getIssuesByTag(t1, function(result) {
					test.equal(result[0], issueId);
					// Now create a new unique tag that shouldn't have any issues associated with it
					t1 += 'x';
					tags.addTag(t1, function(error, tagId) {
						test.ifError(error);
						// Confirm that there are no issues that match this tag
						tags.getIssuesByTag(t1, function(result) {
							test.equal(result.length, 0);
							// Clean up - delete the 2 tags, delete the issue, untag the issue
							dbAccess.remove('issues', { conditions:['id="' + issueId + '"'] }, function (error) {
								test.ifError(error);
								tags.untagIssue(issueId, function(error) {
									test.ifError(error);
									// TODO: delete the 2 tags
									test.done();
								});
							});
						});
					});
				});
			});
		});
	},
	testUntagIssue: function(test) {
		// First create a new issue
		dbAccess.create('issues', 
		{ values: ['user_id="332338"', 'status="online"', 'title="myissue"', 'description="desc"', 'link=""', 'location="NE"']},
		function(error, issueId) {
			test.ifError(error);
			// Now tag it
			var t1 = 'tag1';
			tags.tagIssue(issueId, t1, function (error) {
				test.ifError(error);
				// Ensure that it was tagged correctly
				tags.getTagsString(issueId, function(ts) {
					test.equal(ts, t1);
					// Now untag the issue
					tags.untagIssue(issueId, function(error) {
						test.ifError(error);
						// Ensure getTagsString returns an empty string now
						tags.getTagsString(issueId, function(ts2) {
							test.equal(ts2, '');
							// Clean up - delete the tag, delete the issue, untag the issue
							dbAccess.remove('issues', { conditions:['id="' + issueId + '"'] }, function (error) {
								test.ifError(error);
								tags.untagIssue(issueId, function(error) {
									test.ifError(error);
									// TODO: delete the tag
									test.done();
								});
							});
						});
					});
				});
			});
		});
	},
	testUpdateTags: function(test) {
		// First create a new issue
		dbAccess.create('issues', 
		{ values: ['user_id="332338"', 'status="online"', 'title="myissue"', 'description="desc"', 'link=""', 'location="NE"']},
		function(error, issueId) {
			test.ifError(error);
			// Now tag it
			var t1 = 'tag1';
			tags.tagIssue(issueId, t1, function (error) {
				test.ifError(error);
				// Ensure that it was tagged correctly
				tags.getTagsString(issueId, function(ts) {
					test.equal(ts, t1);
					// Now update the tag to be something else instead of 'tag1'
					tags.updateTags(issueId, 'tag2', function(error) {
						test.ifError(error);
						// Ensure it returns the updated tags
						tags.getTagsString(issueId, function(ts) {
							test.equal(ts, 'tag2');
							// Clean up - delete the tags, delete the issue, untag the issue
							dbAccess.remove('issues', { conditions:['id="' + issueId + '"'] }, function (error) {
								test.ifError(error);
								tags.untagIssue(issueId, function(error) {
									test.ifError(error);
									// TODO: delete the tags
									test.done();
								});
							});
						});
					});
				});
			});
		});
	}
});

