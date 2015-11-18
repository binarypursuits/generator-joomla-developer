'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the ' + chalk.red('JoomlaDeveloper') + ' module generator!'
		));

		var prompts =
		[
			{
				type : 'input',
				name : 'camelcase',
				message : 'Enter name of the new module using CamelCase formatting:'
			},
			{
				type : 'input',
				name : 'description',
				message : 'Enter a description for your new module:'
			},
		];

		this.prompt(prompts, function (props) {
			this.formal = props.camelcase
			props.camelcase = props.camelcase.replace(/\s+/g, '');
			this.camelcase = props.camelcase;
			done();
		}.bind(this));
	},

	writing: {
		module: function () {
			var months = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];
			var date = new Date();

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
					languagecode: this.languagecode || this.config.get('languagecode'),
					mediafolder: false,
					rootPath: this.config.get('joomlaFolder') || 'webroot'
				};

			var modules = this.config.get('modules');
			modules.push(params);
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
