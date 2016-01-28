"use strict";

module.exports = function (grunt) {

    grunt.config("perfbudget", {
        "default": {
            options: {
                url: "http://lifestorageweb-staging.azurewebsites.net/",
                key: "6dae1bbc077d4f1aaa21c578dfb49910"
            }
        }
    });

};
