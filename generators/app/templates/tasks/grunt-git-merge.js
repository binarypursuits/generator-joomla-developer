'use-strict';

module.exports = function(grunt) {

	grunt.registerTask('grunt-git-merge', 'Testing custom multitask', function(branch) {
		var done = this.async();
		var exec = require('child_process').exec;

		exec('git merge --no-ff ' + branch, { cwd: grunt.config('repoPath') }, function (error, stdout, stderr) {
			if (error)
			{
				grunt.log.errorlns(error);
			}
			else
			{

			}
		});
	});

};
