"use strict";

module.exports = function (grunt) {

    grunt.config("phpdocumentor", {
        options: {
            phar: "build/phpDocumentor.phar"
        },
        PHP: {
            options: {
                directory: "<%= arc.assets.directories.php %>",
				filename: "<%= arc.assets.php %>",
				ignore: "<%= arc.assets.ignore.php %>",
                target: "docs/PHP"
            }
        }
    });

};
