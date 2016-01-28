'use strict';

module.exports = function (grunt) {

    grunt.config('replace', {
        all: {
            src: ['build/scripts.min.js'],
            dest: 'build/scripts.min.js',
            replacements: [
                {
                    from: '\'use strict\';',
                    to: ''
                },
                {
                    from: '"use strict";',
                    to: ''
                }
            ]
        }
    });

};
