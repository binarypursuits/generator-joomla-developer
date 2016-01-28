"use strict";

module.exports = function (grunt) {

    grunt.config.merge({
        arc: {
            livereload: {
                port: 35729
            },
            url: {
                "production" : "",
                "staging" : "",
                "development" : ""
            },
            jira: {
                "host" : "",
                "user": "",
                "password": ""
            },
            azure: {
                "production": {
                    "account_name": "",
                    "account_key": ""
                },
                "documentation": {
                    "account_name": "",
                    "account_key": ""
                }
            },
            assets: {
                directories: {
                    js: [],
                    php: []
                },
                ignore: {
                    php: []
                },
                css: [],
                js: [],
                less: []
            },
            watch: {
                js: {
                    detailview: [],
                    template: [],
                    libs: []
                },
                css: {
                    template: []
                }
            }
        }
    });
};

