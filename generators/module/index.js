"use strict";

var generators = require('yeoman-generator');
var slugify = require('slugify');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var glob = require('glob');
var prompts = require('../../scripts/prompts');

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

            var prompt = [
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
                    type: 'input',
                    name: 'version',
                    message: 'Enter version for this Joomla instance:',
                    "default": "0.1.0"
                },
                {
                    type: 'checkbox',
                    name: 'overrides',
                    message: 'Select which configuration items you would like to override defaults for?',
                    choices: [
                        'development'
                    ],
                    store: 'false'
                }
            ];

            this.prompt(prompt, function (response) {
                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                var date = new Date();
                
                this.options = {
                    formal: response.name,
                    camelcase: response.name.replace(/\s+/g, ''),
                    uppercase: response.name.replace(/\s+/g, '').toUpperCase(),
                    lowercase: response.name.replace(/\s+/g, '').toLowerCase(),
                    module: "mod_" + response.name.replace(/\s+/g, '').toLowerCase(),
                    created: months[date.getMonth()] + ' ' + date.getFullYear(),
                    description: response.description,
                    version: response.version,
                    overrides: response.overrides
                };

                done();
            }.bind(this));

        },
        development: function () {

            if (this.options.overrides.indexOf('development') === -1)
            {
                this.options.development = this.config.get('development');
                return true;
            }

            var done = this.async();
              
            var prompt = [{
                type: 'input',
                name: 'author',
                message: 'Enter default author for development on this Joomla instance:',
                store: true
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
            {
                type: 'input',
                name: 'website',
                message: 'Enter local URL for development off this Joomla instance:',
                store: true
            },
            {
                type: 'input',
                name: 'languagecode',
                message: 'Enter default language code for development on this Joomla instance:',
                "default": 'en-GB',
                store: true
            }];
        
            this.prompt(prompt, function (responses) {
               
                this.options.development = {
                    author: responses.author,
                    copyright: responses.copyright,
                    license: responses.license,
                    email: responses.email,
                    website: responses.website,
                    languagecode: responses.languagecode
                };

                done();
            }.bind(this));
        },
        media: function () {

            var done = this.async();
              
            var prompt = [{
                type: 'checkbox',
                name: 'media',
                message: 'Select which configuration items you would like to override defaults for?',
                choices: [{
                        name: 'js',
                        checked: true
                    },
                    {
                        name: 'css',
                        checked: false
                    },
                    {
                        name: 'images',
                        checked: true
                    },
                    {
                        name: 'fonts',
                        checked: false
                    },
                    {
                        name: 'less',
                        checked: true
                    },
                    {
                        name: 'scss',
                        checked: false
                    },
                    {
                        name: 'sass',
                        checked: false
                    }
                ]
            }];
            
            this.prompt(prompt, function (responses) {

                this.options.media = responses.media;

                var extensions = this.config.get('extensions');
                
                extensions.modules.push(this.options);
                this.config.set('extensions', extensions);
                
                this.options.joomla = this.config.get('joomla');

                done();
            }.bind(this));
        }
    },
    writing: {
        templates: function () {
            var module_path = this.options.joomla.root + "/modules/" + this.options.module + '/';
            
            glob.sync('**', { cwd: this.templatePath('root') }).map(function (file) {
                this.fs.copyTpl(this.templatePath('root/' + file), this.destinationPath(module_path + file.replace(/^_/, '')), this.options);
            }, this);
            
            glob.sync('**', { cwd: this.templatePath('tmpl') }).map(function (file) {
                this.fs.copyTpl(this.templatePath('tmpl/' + file), this.destinationPath(module_path + "tmpl/" + file.replace(/^_/, '')), this.options);
            }, this);
            
            glob.sync('**', { cwd: this.templatePath('language') }).map(function (file) {
                this.fs.copyTpl(this.templatePath('language/' + file), this.destinationPath(this.options.joomla.root + '/language/' + this.options.development.languagecode + '/' + file.replace('_language', this.options.development.languagecode + '.' + this.options.module)), this.options);
            }, this);
            
            this.fs.copyTpl(this.templatePath('manifest.xml'), this.destinationPath(this.options.joomla.root + "/modules/" + this.options.module + "/" + this.options.module + ".xml"), this.options);
            this.fs.copyTpl(this.templatePath('module.php'), this.destinationPath(this.options.joomla.root + "/modules/" + this.options.module + "/" + this.options.module + ".php"), this.options);
            
            if (this.options.media.length > 0)
            {
                this.fs.copy(this.templatePath('index.html'), this.destinationPath(this.options.joomla.root + "/media/" + this.options.module + "/index.html"));
                
                for (var i = 0; i < this.options.media.length; i++)
                {
                    this.fs.copy(this.templatePath('index.html'), this.destinationPath(this.options.joomla.root + "/media/" + this.options.module + "/" + this.options.media[i] + "/index.html"));
                }
            }
        }
    },
    install: function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});
