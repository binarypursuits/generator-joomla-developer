'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        // add option to skip install
        // this.option('skip-install');
        this.slugify = slugify;

    },
    prompting: {
        module: function () {
            // Have Yeoman greet the user.
            this.log(yosay('Welcome to the ' + chalk.red('Joomla Developer') + ' Module Generator!'));

            if (this.options.joomla !== undefined) {
                return true;
            }

            var done = this.async();

            var promps = [
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter the formal name of the new module, including spaces:'
                },
                {
                    type: 'input',
                    name: 'description',
                    message: 'Enter a description for your new module:'
                },
                {
                    type: 'confirm',
                    name: 'override',
                    message: 'Would you like to override the default developer values?',
                    "default": false                    
                }
            ];

            this.prompt(prompt, function (response) {
                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                var date = new Date();
                
                this.options.module = {
                    formal: response.name,
                    camelcase: response.name.replace(/\s+/g, ''),
                    uppercase: response.name.replace(/\s+/g, '').toUpperString(),
                    lowercase: response.name.replace(/\s+/g, '').toLowerString(),
                    created: months[date.getMonth()] + ' ' + date.getFullYear(),
                    description: response.description,
                    override: response.override
                };

                done();
            }.bind(this));

        },
        developer: function () {
            if (this.options.developer !== undefined) {
                return true;
            }

            var done = this.async();
            
            if (this.options.override === true)
            {
                
            }
            
            var prompt = [{
                type: 'input',
                name: 'author',
                message: 'Enter default module author:',
                "default": this.config.get('author')
            },
            {
                type: 'input',
                name: 'copyright',
                message: 'Enter default copyright for development on this Joomla instance:',
                store: true
            },
            {
                type: 'input',
                name: 'license',
                message: 'Enter default license for development on this Joomla instance:',
                "default": 'GNU General Public License version 2 or later; see LICENSE.txt',
                store: true
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter default email for development on this Joomla instance:',
                store: true
            },
            ];
        }
    },
    writing: {
        module: function () {


            var params = {
                formal: this.formal,
                module: this.camelcase.toLowerCase(),
                author: this.author || this.config.get('author'),
                created: months[date.getMonth()] + ' ' + date.getFullYear(),
                copyright: this.copyright || this.config.get('copyright'),
                license: this.license || this.config.get('license'),
                email: this.email || this.config.get('email'),
                website: this.website || this.config.get('website'),
                version: '0.0.0',
                description: this.description,
                uppercase: this.camelcase.toUpperCase(),
                camelcase: this.camelcase,
                languagefile: true,
                languagecode: this.language.code,
                mediafolder: false,
                rootPath: this.config.get('joomlaFolder') || 'webroot'
            };

            var modules = this.config.get('modules');
            modules.push(this.options);
            this.config.set('modules', modules);

            this.fs.copyTpl(
                    this.templatePath('_manifest.xml'),
                    this.destinationPath(params.rootPath + '/modules/mod_' + params.module + '/mod_' + params.module + '.xml'),
                    params
                    );

            this.fs.copyTpl(
                    this.templatePath('_module.php'),
                    this.destinationPath(params.rootPath + '/modules/mod_' + params.module + '/mod_' + params.module + '.php'),
                    params
                    );

            this.fs.copyTpl(
                    this.templatePath('_default.php'),
                    this.destinationPath(params.rootPath + '/modules/mod_' + params.module + '/tmpl/default.php'),
                    params
                    );

            this.fs.copyTpl(
                    this.templatePath('_helper.php'),
                    this.destinationPath(params.rootPath + '/modules/mod_' + params.module + '/helper.php'),
                    params
                    );

            if (params.languagefile === true && typeof params.languagecode !== "undefined")
            {

                this.fs.copyTpl(
                        this.templatePath('_language.ini'),
                        this.destinationPath(params.rootPath + '/language/' + params.languagecode + '/' + params.languagecode + '.mod_' + params.module + '.ini'),
                        params
                        );

                this.fs.copyTpl(
                        this.templatePath('_language.sys.ini'),
                        this.destinationPath(params.rootPath + '/language/' + params.languagecode + '/' + params.languagecode + '.mod_' + params.module + '.sys.ini'),
                        params
                        );

            }

            this.fs.copyTpl(
                    this.templatePath('index.html'),
                    this.destinationPath(params.rootPath + '/modules/mod_' + params.module + '/index.html')
                    );

            this.fs.copyTpl(
                    this.templatePath('index.html'),
                    this.destinationPath(params.rootPath + '/modules/mod_' + params.module + '/tmpl/index.html')
                    );
        }
    },
    install: function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});
