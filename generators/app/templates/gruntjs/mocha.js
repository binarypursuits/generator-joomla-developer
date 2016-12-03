'use strict';

module.exports = function (grunt) {

    grunt.config('mocha', {
        
        options: {
            run: true,
            log: true,
            logErrors: true
        },
        tests: {
            src: 'test.html',
            dest: 'reports/result.tap'
        }
        
    });
    
};
