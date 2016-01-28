'use strict';

module.exports = function (grunt) {

    grunt.config('compress', {
        media: {
            options: {
                mode: 'gzip'
            },
            files: [
                {
                    expand: true,
                    src: ['build/*.min.js'],
                    dest: './',
                    ext: '.min.js.gz'
                },
                {
                    expand: true,
                    src: ['build/*.min.css'],
                    dest: './',
                    ext: '.min.css.gz'
                }
            ]
        },
        custom: {
            options: {
                mode: 'gzip'
            },
            files: [
                {
                    expand: true,
                    src: ['<%= repository.name %>/media/tpl_hilco/css/*.min.css', '<%= repository.name %>/media/com_hassetdb/css/*.min.css'],
                    dest: './',
                    ext: '.min.css.gz'
                },
                {
                    expand: true,
                    src: ['<%= repository.name %>/media/tpl_hilco/js/*.min.js', '<%= repository.name %>/media/com_hassetdb/js/*.min.js'],
                    dest: './',
                    ext: '.min.js.gz'
                }
            ]
        }
    });

};
