"use strict";

module.exports = function (grunt) {

    grunt.config("wiredep", {
        target: {
            src: ["<%= joomla.root %>/templates/hilco/index.php"],
            cwd: "./"
        }
    });

};
