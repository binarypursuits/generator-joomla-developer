'use strict';

module.exports = function (grunt) {

    grunt.config('concat', {
        options: {
            separator: ';'
        },
        js: {
            src: grunt.config.get('arc.assets.js'),
            dest: '<%= repository.name %>/media/tpl_hilco/js/tpl_hilco.min.js'
        },
        css: {
            src: grunt.config.get('arc.assets.css'),
            dest: '<%= repository.name %>/media/tpl_hilco/css/tpl_hilco.min.css'
        }

    });

};
