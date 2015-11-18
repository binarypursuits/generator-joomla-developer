'use-strict'

var exec = require('child_process').exec;

module.exports = function(grunt) {

	grunt.registerTask('log-io-server', 'Start log.io server for development.', function(i, length) {
		var done = this.async();

		exec("log.io-server.cmd", { cwd: "./" }, function (error, stdout, stderr) {

			if (error)
			{
				done(error);
			}
			else
			{
				grunt.log.writeln(stdout);
				grunt.log.writeln('Log.io server has started.')
				done();
			}
		});
	});
};