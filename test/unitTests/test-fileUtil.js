/* test-fileUtil.js 
 * Tests functionality of fileUtil module   
 */ 
 
var fileUtil = require('../../node_modules/fileUtil');
var testCase = require('nodeunit/nodeunit').testCase;
var fs = require('fs'); 

var file_1KB = 'test/unitTests/testDataFiles/fileUtil/KB_1.html',
	file_100KB = 'test/unitTests/testDataFiles/fileUtil/KB_100.html',
	file_1000KB = 'test/unitTests/testDataFiles/fileUtil/KB_1000.html';

module.exports = testCase({
	setUp: function (callback) {
		callback();
	},
	 
	tearDown: function (callback) {
		callback();
	},
	
	testReadFilesWithSingleFile: function (test) {
		fileUtil.readFiles([file_1KB], function(error, results) { 
			test.equals(error, null); 
			fileCount = 0; 
			for (i in results) { fileCount++ }
			test.equals(fileCount, 1);
			test.ok(results[file_1KB] != undefined); 
			test.done();		
		}); 
	},
	
	testReadFilesWithMultipleFiles: function (test) {
		fileUtil.readFiles([file_1KB, file_100KB, file_1000KB], function(error, results) { 
			test.equals(error, null); 
			fileCount = 0; 
			for (i in results) { fileCount++ }
			test.equals(fileCount, 3);
			test.ok(results[file_1KB] != undefined); 
			test.ok(results[file_100KB] != undefined); 
			test.ok(results[file_1000KB] != undefined);
			test.done();		
		}); 
	},
	
	testReadFilesWithSameFile: function (test) {
		fileUtil.readFiles([file_1KB, file_1KB], function(error, results) { 
			test.equals(error, null); 
			fileCount = 0; 
			for (i in results) { fileCount++ }
			test.equals(fileCount, 1);
			test.ok(results[file_1KB] != undefined); 
			test.done();		
		}); 
	},
	
	testReadFilesWithNoFile: function (test) {
		fileUtil.readFiles([ ], function(error, results) { 
			test.equals(error, null); 
			fileCount = 0; 
			for (i in results) { fileCount++ }
			test.equals(fileCount, 0);
			test.done();	
		}); 
	}
});
