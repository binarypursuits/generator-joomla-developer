"use strict";

module.exports = function (grunt) {

    grunt.config("yuidoc", {
        build: {
            name: "<%= pkg.name %>",
            description: "<%= pkg.description %>",
            version: "<%= joomla.version %>",
            url: "<%= development.website %>",
            options: {
                paths: "<%= arc.assets.directories.js %>",
                //themedir: "path/to/custom/theme/",
                outdir: "docs/JavaScript",
                markdown: {
                    "README.md" : {
                        linkify: true
                    }
                }
            }
        }
    });
    
};
