'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

Array.prototype.contains = function(k) {
	for (var i = 0; i < this.length; i++)
	{
		if(this[i] === k)
		{
			return true;
		}
	}
	return false;
}

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the ' + chalk.red('JoomlaDeveloper') + ' plugin generator!'
		));

		var prompts =
		[
			{
				type : 'input',
				name : 'camelcase',
				message : 'What is name of the new plugin using CamelCase formatting?',
				store : true
			},
			{
				type : 'confirm',
				name : 'languagefile',
				message : 'Create language files for your plugin?',
				"default" : true,
				store : true
			},
			{
				type : 'input',
				name : 'languagecode',
				message : 'Default language code to use?',
				"default" : "en-GB",
				store : true
			},
			{
				type : 'list',
				name : 'pluginType',
				message : 'What group is the plugin you are creating in?',
				choices: ['Authentication','Captcha','Content','Editors','Editors-xtd','Finder','Quickicon','Search','System','Twofactorauth','User'],
				store : true
			},
			{
				type : 'checkbox',
				name : 'includedMethods',
				message : 'What events do you intent to subscribe too?',
				choices: [
					'onUserLogin',
					'onUserLogout',
					'onUserAuthenticate',
					'onUserLoginFailure',
					'onUserAfterLogin',
					'onUserBeforeSave',
					'onUserAfterSave',
					'onUserBeforeDelete',
					'onUserAfterDelete',
					'onExtensionAfterInstall',
					'onExtensionAfterUninstall',
					'onExtensionAfterUpdate',
					'onContentPrepare',
					'onContentAfterTitle',
					'onContentBeforeDisplay',
					'onContentAfterDisplay',
					'onContentBeforeSave',
					'onContentAfterSave',
					'onContentPrepareForm',
					'onContentPrepareData',
					'onContentBeforeDelete',
					'onContentAfterDelete',
					'onContentChangeState',
					'onContentSearch',
					'onContentSearchAreas',
					'onCategoryChangeState',
					'onValidateContact',
					'onSubmitContact',
					'onGetIcons'
				],
				checked: true,
				store : false
			}
		];

		this.prompt(prompts, function (props) {
			this.formal = props.camelcase;
			this.camelcase = props.camelcase.replace(/\s+/g, '');
			this.pluginType = props.pluginType.toLowerCase();
			this.uppercaseType = props.pluginType.toUpperCase();
			this.formalType = this.pluginType.charAt(0).toUpperCase() + this.pluginType.slice(1)
			this.includedMethods = props.includedMethods;
			this.languagefile = props.languagefile;
			this.languagecode = props.languagecode;
			done();
		}.bind(this));
	},

	writing: {
		plugin: function () {
			var months = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];
			var date = new Date();

			var params = {
					formal: this.formal,
					plugin: this.camelcase.toLowerCase(),
					type: this.pluginType,
					formalType: this.formalType,
					rootPath: this.config.get('joomlaFolder') || 'webroot',
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
					languagefile: this.languagefile,
					languagecode: this.languagecode || this.config.get('languagecode'),
					uppercaseType: this.uppercaseType,
					mediafolder: false,
					triggers: {
						onUserLogin: this.includedMethods.contains('onUserLogin') ? true : false,
						onUserLogout: this.includedMethods.contains('onUserLogout') ? true : false,
						onUserAuthenticate: this.includedMethods.contains('onUserAuthenticate') ? true : false,
						onUserLoginFailure: this.includedMethods.contains('onUserLoginFailure') ? true : false,
						onUserAfterLogin: this.includedMethods.contains('onUserAfterLogin') ? true : false,
						onUserBeforeSave: this.includedMethods.contains('onUserBeforeSave') ? true : false,
						onUserAfterSave: this.includedMethods.contains('onUserAfterSave') ? true : false,
						onUserBeforeDelete: this.includedMethods.contains('onUserBeforeDelete') ? true : false,
						onUserAfterDelete: this.includedMethods.contains('onUserAfterDelete') ? true : false,
						onExtensionAfterInstall: this.includedMethods.contains('onExtensionAfterInstall') ? true : false,
						onExtensionAfterUninstall: this.includedMethods.contains('onExtensionAfterUninstall') ? true : false,
						onExtensionAfterUpdate: this.includedMethods.contains('onExtensionAfterUpdate') ? true : false,
						onContentPrepare: this.includedMethods.contains('onContentPrepare') ? true : false,
						onContentAfterTitle: this.includedMethods.contains('onContentAfterTitle') ? true : false,
						onContentBeforeDisplay: this.includedMethods.contains('onContentBeforeDisplay') ? true : false,
						onContentAfterDisplay: this.includedMethods.contains('onContentAfterDisplay') ? true : false,
						onContentBeforeSave: this.includedMethods.contains('onContentBeforeSave') ? true : false,
						onContentAfterSave: this.includedMethods.contains('onContentAfterSave') ? true : false,
						onContentPrepareForm: this.includedMethods.contains('onContentPrepareForm') ? true : false,
						onContentPrepareData: this.includedMethods.contains('onContentPrepareData') ? true : false,
						onContentBeforeDelete: this.includedMethods.contains('onContentBeforeDelete') ? true : false,
						onContentAfterDelete: this.includedMethods.contains('onContentAfterDelete') ? true : false,
						onContentChangeState: this.includedMethods.contains('onContentChangeState') ? true : false,
						onContentSearch: this.includedMethods.contains('onContentSearch') ? true : false,
						onContentSearchAreas: this.includedMethods.contains('onContentSearchAreas') ? true : false,
						onCategoryChangeState: this.includedMethods.contains('onCategoryChangeState') ? true : false,
						onValidateContact: this.includedMethods.contains('onValidateContact') ? true : false,
						onSubmitContact: this.includedMethods.contains('onSubmitContact') ? true : false,
						onGetIcons: this.includedMethods.contains('onGetIcons') ? true : false
					}
				};

			var plugins = this.config.get('plugins');
			plugins.push(params);
			this.config.set('plugins', plugins);

			this.fs.copyTpl(
				this.templatePath('_manifest.xml'),
				this.destinationPath(params.rootPath + '/plugins/' + params.type + '/' + params.plugin + '/' + params.plugin + '.xml'),
				params
			);

			this.fs.copyTpl(
					this.templatePath('_plugin.php'),
					this.destinationPath(params.rootPath + '/plugins/' + params.type + '/' + params.plugin + '/' + params.plugin + '.php'),
					params
				);

			if (params.languagefile === true && typeof params.languagecode !== "undefined")
			{

				this.fs.copyTpl(
					this.templatePath('_language.ini'),
					this.destinationPath(params.rootPath + '/administrator/language/' + params.languagecode + '/' + params.languagecode + '.plg_' + params.type + '_' + params.plugin + '.ini'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_language.sys.ini'),
					this.destinationPath(params.rootPath + '/administrator/language/' + params.languagecode + '/' + params.languagecode + '.plg_' + params.type + '_' + params.plugin + '.sys.ini'),
					params
				);

			}

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/plugins/' + params.type + '/' + params.plugin + '/index.html')
			);
		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
