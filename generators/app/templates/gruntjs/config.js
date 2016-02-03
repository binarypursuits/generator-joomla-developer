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
            jenkins: {
                apache: {
                    webroot: '/var/www/'
                },
                mysql: {
                    type: 'mysqli',
                    host: 'localhost',
                    user: '',
                    password: '',
                    database: '',
                    prefix: ''
                },
                joomla: {
                    livesite: '',
                    mailer: 'smtp',
                    mailfrom: '',
                    fromname: 'Arc CI - Hilco Webmaster',
                    smtpauth: '1',
                    smtpuser: '',
                    smtppass: '',
                    smtphost: 'smtp.gmail.com',
                    smtpsecure: 'TLS',
                    smtpport: '587'
                }
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
            replace: {
                versioning: [
                    'package.json',
                    'bower.json',
                    '<%= joomla.root %>/**/*.php',
                    '<%= joomla.root %>/**/*.js'
                ],
                minified: []
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

