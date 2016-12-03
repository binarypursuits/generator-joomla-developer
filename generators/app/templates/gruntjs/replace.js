"use strict";

module.exports = function (grunt) {

    grunt.config("replace", {
        version: {
            src: "<%= arc.replace.versioning %>",
            overwrite: true,
            replacements: [
                {
                    from: "{VERSION}",
                    to: "<%= pkg.version %>"
                }
            ]
        },
        minified: {
            src: "<%= arc.replace.minified %>",
            overwrite: true,
            replacements: [
                {
                    from: ".js",
                    to: ".min.js"
                },
                {
                    from: ".css",
                    to: ".min.css"
                }
            ]
        }
    });

};
