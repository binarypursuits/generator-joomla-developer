'use-strict';

module.exports = function(grunt) {

	grunt.registerTask('grunt-git-tag', 'Testing custom multitask', function(version) {
		var done = this.async();
		var exec = require('child_process').exec;

		exec('git tag -m "tagged version ' + version + ' release" ' + version, { cwd: grunt.config('repoPath') }, function (error, stdout, stderr) {
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
