"use strict";

module.exports = function (grunt) {

    grunt.config("clean", {
        docs: [
            "docs/PHP/**/*",
            "docs/JavaScript/**/*"
        ]
    });

};
