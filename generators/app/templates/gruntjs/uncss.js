"use strict";

module.exports = function (grunt) {

    grunt.config("uncss", {
        dist: {
            files: {
				"<% uncss.source %>": ["<% uncss.target %>"]
			}
        }
    });

};
