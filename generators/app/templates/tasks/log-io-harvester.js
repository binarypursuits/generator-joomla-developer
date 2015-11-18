'use-strict'

var exec = require('child_process').exec;

module.exports = function(grunt) {

	grunt.registerTask('log-io-harvester', 'Start log.io harvester for development.', function(i, length) {
		var done = this.async();

		exec("log.io-harvester.cmd", { cwd: "./" }, function (error, stdout, stderr) {

			if (error)
			{
				done(error);
			}
			else
			{
				grunt.log.writeln(stdout);
				grunt.log.writeln('Log.io harvester started.')
				done();
			}
		});
	});
};