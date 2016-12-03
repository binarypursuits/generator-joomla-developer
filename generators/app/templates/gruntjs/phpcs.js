'use strict';

module.exports = function (grunt) {

    grunt.config('phpcs', {
        application: {
            src: ['<%= php_files %>']
        },
        options: {
            bin: './phpcs',
            standard: 'Joomla',
            recurse: true
        }
    });

};
