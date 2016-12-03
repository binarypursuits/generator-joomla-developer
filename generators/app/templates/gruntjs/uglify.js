"use strict";

module.exports = function (grunt) {

    grunt.config("uglify", {
        options: {
            mangle: false
        },
        all: {
            options: {
                //mangle: ["googleTracking", "netResultsTracking", "arcLogging", "template", "url", "jQuery", "$"]
                mangle: false
            },
            files: grunt.config.get("arc.assets.js")
        } 
    });
    
};
