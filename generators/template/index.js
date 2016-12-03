'use strict';

var generators = require('yeoman-generator');
var slugify = require('slugify');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var glob = require('glob');
var date = require('../../scripts/date');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        // add option to skip install
        this.option('skip-install');
        this.slugify = slugify;

    },
    prompting: {
        preprocessor: function () {
            var done = this.async();
            // Have Yeoman greet the user.
            this.log(yosay(
                    'Welcome to the ' + chalk.red('JoomlaDeveloper') + ' component generator!'
                    ));

            var prompts =
                    [
                        {
                            type: 'input',
                            name: 'formal',
                            message: 'What is formal name of the new template using readable formatting?',
                            store: true
                        },
                        {
                            type: 'input',
                            name: 'version',
                            message: 'What is name of the new template using CamelCase formatting?',
                            "default": "0.1.0"
                        },
                        {
                            type: 'input',
                            name: 'description',
                            message: 'Enter description of the new template?',
                            "default": 'Custom template'
                        }
                    ];

            this.prompt(prompts, function (response) {
                this.options.template = {
                    formal: response.formal,
                    name: response.formal.replace(/\s+/g, '').toLowerCase(),
                    template: response.formal.replace(/\s+/g, '_').toLowerCase(),
                    language: response.formal.replace(/\s+/g, '_').toUpperCase(),
                    version: response.version,
                    description: response.description,
                    created: date.created()
                };

                this.options.joomla = this.config.get('joomla');
                this.options.development = this.config.get('development');

                done();
            }.bind(this));
        }
    },
    writing: {
        template: function () {

            var extensions = this.config.get('extensions');
            extensions.templates.push(this.options.template);
            this.config.set('extensions', extensions);

            var mediaPath = this.options.joomla.root + '/media/tpl_' + this.options.template.name + '/';
            var templatePath = this.options.joomla.root + '/templates/' + this.options.template.name + '/';

            this.fs.copy(this.templatePath('index.html'), this.destinationPath(mediaPath + 'js/index.html'));
            this.fs.copy(this.templatePath('index.html'), this.destinationPath(mediaPath + 'css/index.html'));
            this.fs.copy(this.templatePath('index.html'), this.destinationPath(mediaPath + 'less/index.html'));
            this.fs.copy(this.templatePath('index.html'), this.destinationPath(mediaPath + 'sass/index.html'));
            this.fs.copy(this.templatePath('index.html'), this.destinationPath(mediaPath + 'fonts/index.html'));
            this.fs.copy(this.templatePath('index.html'), this.destinationPath(mediaPath + 'images/index.html'));

            this.fs.copy(this.templatePath('index.html'), this.destinationPath(templatePath + 'html/index.html'));

            glob.sync('**', {cwd: this.templatePath()}).map(function (file) {
                this.fs.copyTpl(this.templatePath(file), this.destinationPath(this.options.joomla.root + '/templates/' + this.options.template.name + '/' + file.replace(/^_/, '')), this.options);
            }, this);

        }
    },
    install: function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});
