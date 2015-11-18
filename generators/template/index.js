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
			'Welcome to the ' + chalk.red('JoomlaDeveloper') + ' component generator!'
		));

		var prompts =
		[
			{
				type : 'input',
				name : 'camelcase',
				message : 'What is name of the new template using CamelCase formatting?',
				store : true
			}
		];

		this.prompt(prompts, function (props) {
			this.camelcase = props.camelcase;
			done();
		}.bind(this));
	},

	writing: {
		component: function () {

			var months = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];
			var date = new Date();

			var params = {
					template: this.camelcase.toLowerCase(),
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
					folders: {
						js: true,
						css: true,
						html: true,
						fonts: true,
						images: true
					}
				};


			var templates = this.config.get('templates');
			templates.push(params);
			this.config.set('templates', templates);

			console.log('Added new template to yo manifest...');

			// Generate template files
			this.fs.copyTpl(
				this.templatePath('_manifest.xml'),
				this.destinationPath('joomla/temmplates/' + params.template + '/templateDetails.xml'),
				params
			);

			console.log('Manifest');

			if (params.folder.js)
			{
				this.fs.copyTpl(
					this.templatePath('index.html'),
					this.destinationPath('joomla/templates/' + params.template + '/js/index.html')
				);
			}
			
			if (params.folder.css)
			{
				this.fs.copyTpl(
					this.templatePath('index.html'),
					this.destinationPath('joomla/templates/' + params.template + '/css/index.html')
				);
			}
			
			if (params.folder.fonts)
			{
				this.fs.copyTpl(
					this.templatePath('index.html'),
					this.destinationPath('joomla/templates/' + params.template + '/fonts/index.html')
				);
			}
			
			if (params.folder.html)
			{
				this.fs.copyTpl(
					this.templatePath('index.html'),
					this.destinationPath('joomla/templates/' + params.template + '/html/index.html')
				);
				
				// Options for component and module specific overrides
			}
			
			if (params.folder.images)
			{
				this.fs.copyTpl(
					this.templatePath('index.html'),
					this.destinationPath('joomla/templates/' + params.template + '/images/index.html')
				);
			}
			
		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
