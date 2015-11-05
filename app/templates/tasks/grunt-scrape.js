'use-strict';

var exec = require('child_process').exec;
var base = require('js-base64').Base64;

module.exports = function(grunt) {

	grunt.registerTask('grunt-scrape', 'Scrape endpints to retrieve website assets', function() {
		var endpoints = grunt.config.get('endpoints');

		var length = endpoints.length;

		grunt.log.writeln('Grunt scrape has ' + length + ' endpoints to parse...');

		for (var i = 0; i < length; i++)
		{
			if (endpoints[i].length > 0 && endpoints[i] !== 'index.php?Itemid=')
			{
				grunt.task.run('grunt-scrape-casper-exec:' + i + ':' + length);
			}
			else
			{
				grunt.log.writeln('Skipping endpoint due to invalid URL [' + endpoints[i] + ']');
			}
		}       

	});

};