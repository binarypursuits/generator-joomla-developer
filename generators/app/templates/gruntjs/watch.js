"use strict";

module.exports = function (grunt) {

    grunt.config("watch", {
        options: {
            nospawn: true,
            livereload: "<%= arc.livereload.port %>"
        },
        js: {
            files: "<%= arc.assets.js %>",
            options: {
                livereload: "<%= arc.livereload.port %>"
            }
        },
        css: {
            files: "<%= arc.assets.css %>",
            options: {
                livereload: "<%= arc.livereload.port %>"
            }
        },
        less: {
            files: "<%= arc.assets.less %>",
            tasks: ["less"],
            options: {
                livereload: "<%= arc.livereload.port %>"
            }
        }
    });

};
