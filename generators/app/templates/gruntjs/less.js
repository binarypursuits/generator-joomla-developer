"use strict";

module.exports = function (grunt) {
	
	var config = grunt.config.get();

    grunt.config("less", {
        dist: {
            files: {
                "<%= less.target %>": "<%= less.source %>"
            },
			options: {
				compress: true,
				sourceMap: true,
				sourceMapFilename: "<%= less.map %>"
			}
        }
    });

};
