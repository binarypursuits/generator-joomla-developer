'use-strict';

module.exports = function(grunt) {

	grunt.registerTask('grunt-git-commit', 'Testing custom multitask', function() {
		var done = this.async();
		var exec = require('child_process').exec;
		var origin = origin || 'origin';

		exec('git add -A && git commit', { cwd: grunt.config('repoPath') }, function (error, stdout, stderr) {
			if (error)
			{
				grunt.log.errorlns(error);
				done(error);
			}
			else
			{
				grunt.log.writeln(stdout);
				grunt.log.writeln('Successfully committed all staged and unstaged files...');
				done();
			}
		});
	});

};
