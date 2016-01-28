"use strict";

module.exports = function (grunt) {

    grunt.config('jshint', {
        
        all: '<%= arc.assets.js %>',
        options: {
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            nonew: true,
            noarg: true,
            sub: true,
            undef: true,
            unused: false,
            eqnull: true,
            node: true,
            strict: false,
            boss: false,
            browser: true,
            globals: {
                jQuery: true,
                Joomla: true,
                ARC: true,
                Base64: true,
                template: true,
                updateListIdBrowsing: true,
                alert: true,
                SqueezeBox: true,
                "$$": true,
                arcLogging: true,
                asset: true,
                google: true,
                googleTracking: true,
                _gaq: true,
                netResultsTracking: true,
                url: true,
                assetCarousel: true
            }
        }
    });
};
