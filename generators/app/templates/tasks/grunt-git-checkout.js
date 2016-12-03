'use-strict';

module.exports = function(grunt) {

	grunt.registerTask(
		'grunt-git-checkout',
		'Grunt utility task to execute checkout command against a GIT repository.',
		function(destination, origin) {

			var done = this.async();
			var exec = require('child_process').exec;
			var destination = destination + ' ' || ' ';

			exec(
				'git checkout -b ' + destination + ' ' + origin,
				{ cwd: grunt.config('repoPath') },
				function (error, stdout, stderr) {
					if (error)
					{
						grunt.log.errorlns(error);
						return false;
					}
					else
					{
						// Any logic?
						grunt.log.writelns(stdout);
						done();
					}
			});

		});

};
