'use strict';

module.exports = function (grunt) {

    grunt.config('cssmin', {
        all: {
            files: []
        },
        template: {
            files: grunt.config.get('arc.assets.css')
        }
    });

};
