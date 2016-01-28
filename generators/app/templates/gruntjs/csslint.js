"use strict";

module.exports = function (grunt) {

    grunt.config("csslint", {
        all: {
            options: {
                "import": false,
                "ids": false,
                "overqualified-elements": false,
                "adjoining-classes": false,
                "important": false,
                "box-sizing": false,
                "box-model": false,
                "qualified-headings": false,
                "fallback-colors": false,
                "outline-none": false,
                "unique-headings": false,
                "font-sizes": false,
                "universal-selector": false,
                "regex-selectors": false,
                "unqualified-attributes": false,
                "star-property-hack": false,
                "floats": false,
                "bulletproof-font-face": false,
                "font-faces": false
            },
            src: '<%= arc.assets.css %>'
        }
    });

};