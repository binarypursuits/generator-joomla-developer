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
				message : 'What is name of the new module using CamelCase formatting?',
				store : true
			}
		];

		this.prompt(prompts, function (props) {
			this.camelcase = props.camelcase;
			done();
		}.bind(this));
	},

	writing: {
		module: function () {
			var params = {
					module: this.camelcase.toLowerCase(),
					author: 'Binary Pursuits',
					created: 'January 2015',
					copyright: '&copy; 2011 - 2015 Binary Pursuits.  All Rights Reserved.',
					license: 'GNU General Public License version 2 or later; see LICENSE.txt',
					email: 'joomla@binarypursuits.com',
					website: 'www.binarypursuits.com',
					version: '0.0.0',
					description: 'Test Yeoman Generator for Joomla Modules.',
					uppercase: this.camelcase.toUpperCase(),
					camelcase: this.camelcase,
					languagefile: true,
					languagecode: 'en-GB',
					mediafolder: false
				};

			this.fs.copyTpl(
				this.templatePath('_manifest.xml'),
				this.destinationPath('joomla/modules/mod_' + params.module + '/mod_' + params.module + '.xml'),
				params
			);

			this.fs.copyTpl(
					this.templatePath('_module.php'),
					this.destinationPath('joomla/modules/mod_' + params.module + '/mod_' + params.module + '.php'),
					params
				);

			this.fs.copyTpl(
				this.templatePath('_default.php'),
				this.destinationPath('joomla/modules/mod_' + params.module + '/tmpl/default.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_helper.php'),
				this.destinationPath('joomla/modules/mod_' + params.module + '/helper.php'),
				params
			);

			if (params.languagefile === true && typeof params.languagecode !== "undefined")
			{

				this.fs.copyTpl(
					this.templatePath('_language.ini'),
					this.destinationPath('joomla/language/' + params.languagecode + '/' + params.languagecode + '.mod_' + params.module + '.ini'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_language.sys.ini'),
					this.destinationPath('joomla/language/' + params.languagecode + '/' + params.languagecode + '.mod_' + params.module + '.sys.ini'),
					params
				);

			}

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/modules/mod_' + params.module + '/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/modules/mod_' + params.module + '/tmpl/index.html')
			);
		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
