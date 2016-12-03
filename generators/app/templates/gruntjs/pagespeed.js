"use strict";

module.exports = function (grunt) {

    grunt.config("pagespeed", {
        options: {
            nokey: true,
            url: "http://lifestorageweb-staging.azurewebsites.net/"
        },
        all: {
            options: {
                locale: "en_US",
                strategy: "desktop",
                threshold: 80
            }
        }
    });

};
