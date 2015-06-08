'use-strict'

var spawn = require('cross-spawn');

module.exports = function(grunt) {

	grunt.registerTask('grunt-scrape-casper', 'Execute casper script to pull CSS and JS files.', function(alias) {

		var path = grunt.config.get('repoPath');
		var endpoints = grunt.config.get('endpoints');
		var link = grunt.config.get('webUrl') + alias;

		grunt.log.writeln('Scraping: ' + link);
		grunt.file.setBase('./tasks');

		var child = spawn('casperjs scrape.js', [link], {
			cwd: 'tasks/',
			stdio: [process.stdin, process.stdout, process.stderr]
		});


	});

};