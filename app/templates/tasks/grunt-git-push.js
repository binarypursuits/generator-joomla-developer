'use-strict';

module.exports = function(grunt) {

	grunt.registerTask('grunt-git-push', 'Testing custom multitask', function(origin, branch) {
		var done = this.async();
		var exec = require('child_process').exec;
		var origin = origin || 'origin';

		exec('git push ' + origin + ' ' + branch, { cwd: grunt.config('repoPath') }, function (error, stdout, stderr) {
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
