'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var packager = require('./packager');

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the ' + chalk.red('JoomlaDeveloper') + ' packager!'
		));

		var determineType =
		[
			{
				type: 'list',
				name: 'type',
				message: 'What type of Joomla extension would you like to package?',
				choices: ['Component', 'Module', 'Plugin', 'Template', 'Library', 'Language']
			}
		];

		this.prompt(determineType, function(props)
		{
			var name = props.type.toLowerCase();
			name = name + 's';

			var extensions = this.config.get(name);
			this.type = name;

			var options = [];

			for (var i = 0; i < extensions.length; i++)
			{
				options.push(extensions[i].formal.name);
			}

			if (options.length === 0)
			{
				done('There are no extensions of type ' + props.type + ' to choose from!');
			}

			var determineExtension =
			[
			 	{
			 		type: 'list',
			 		name: 'extension',
			 		message: 'Which ' + props.type + ' would you like to package?',
			 		choices: options
			 	}
			];

			this.prompt(determineExtension, function(props){
				this.extension = props.extension;
				done();
			}.bind(this));

		}.bind(this));
	},

	writing: {
		"package": function () {

			function loadDetails(extensions, name)
			{


				for (var i = 0; i < extensions.length; i++)
				{
					if (extensions[i].formal.name == name)
					{
						return extensions[i];
					}
				}

				return false;

			}

			var ioFileOperations = function(template, destination)
			{
				this.fs.copyTpl(source, destination);
			}.bind(this);

			var extensions = this.config.get(this.type);
			var target = loadDetails(extensions, this.extension);

			packager.type(this.type);
			packager.load(target);



		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
