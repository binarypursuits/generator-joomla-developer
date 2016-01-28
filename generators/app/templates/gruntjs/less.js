"use strict";

module.exports = function (grunt) {

    grunt.config("less", {
        dist: {
            files: {
                "<%= joomla.root %>/media/tpl_hilco/css/style.css": "<%= joomla.root %>/media/tpl_hilco/less/main.less"
            }
        }
    });

};
