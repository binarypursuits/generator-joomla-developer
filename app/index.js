'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var Git = require('git-tools');
var md5 = require('MD5');
var path = require('path');
var random = require('random-ext');
var cp = require('child_process');
var phantomjs = require('phantomjs');
var base = require('js-base64').Base64;
var fs = require('fs');
var async = require('async');
var open = require('open');
var rimraf = require('rimraf');
var Download = require('download');
var progress = require('download-status');
var mysql = require('mysql');
var binPath = phantomjs.path;

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
		this.log(yosay('Welcome to the ' + chalk.red('JoomlaDeveloper') + ' generator!'));

		this.pkg = require('../package.json');

	},

	prompting: function () {

		var done = this.async();

		this.log(yosay('Joomla Instance Information'));

		var prompts =
		[
			{
				type : 'input',
				name : 'name',
				message : 'Enter name for this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'version',
				message : 'Enter version for this Joomla instance:',
				"default": '0.1.0'
			},
			{
				type : 'input',
				name : 'websiteEmail',
				message : 'Enter administrator\'s email for this Joomla instance:',
				store: true
			},
			{
				type : 'input',
				name : 'websitePassword',
				message : 'Enter administrator\'s password for this Joomla instance:',
				store: true
			},
			{
				type : 'input',
				name : 'url',
				message : 'Enter local URL for development off this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'repositoryName',
				message : 'Enter Git Repository Name Joomla Repository you wish to clone for your development instance:',
				store : true
			},
			{
				type : 'input',
				name : 'joomlaFolder',
				message : 'Enter sub-folder name Joomla CMS files will be placed:',
				store : true,
				"default" : 'webroot'
			},
			{
				type : 'input',
				name : 'repositoryUrl',
				message : 'Enter Git Repository URL for this Joomla development instance:',
				store : true
			},
			{
				type : 'confirm',
				name : 'repositoryExisting',
				message : 'Is there already a Joomla CMS code base in the above repository:',
				"default": false,
				store : true
			},
			{
				type : 'input',
				name : 'author',
				message : 'Enter default author for development on this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'copyright',
				message : 'Enter default copyright for development on this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'license',
				message : 'Enter default license for development on this Joomla instance:',
				"default": 'GNU General Public License version 2 or later; see LICENSE.txt',
				store : true
			},
			{
				type : 'input',
				name : 'email',
				message : 'Enter default email for development on this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'website',
				message : 'Enter local URL for development off this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'languagecode',
				message : 'Enter default language code for development on this Joomla instance:',
				"default": 'en-GB',
				store : true
			},
			{
				type : 'input',
				name : 'db_user',
				message : 'Enter database user for this Joomla instance:',
				store: true
			},
			{
				type : 'input',
				name : 'db_password',
				message : 'Enter database password for this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'db_host',
				message : 'Enter database url for this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'db_database',
				message : 'Enter database name for this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'db_prefix',
				message : 'Enter database prefix for this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'ftp_url',
				message : 'Enter ftp url to deploy this Joomla instance:',
				"default" : "",
				store : true
			},
			{
				type : 'input',
				name : 'ftp_user',
				message : 'Enter ftp username to deploy this Joomla instance:',
				"default" : "",
				store : true
			},
			{
				type : 'input',
				name : 'ftp_password',
				message : 'Enter ftp password to deploy this Joomla instance:',
				"default" : "",
				store : true
			},

		];

		this.prompt(prompts, function (props) {
			props.components = [];
			props.modules = [];
			props.plugins = [];
			props.templates = [];
			props.libraries = [];
			props.packages = [];
			props.submodules = [];

			props.path = this.destinationPath().replace(/\\/g, "\\\\").replace(" ","\\ ");
			props.packageName = props.name.replace(/\s+/g, '-').toLowerCase();

			this.websiteEmail = props.websiteEmail;
			this.websitePassword = props.websitePassword;

			this.website = props.website;
			this.url = props.url;
			this.path = props.path;
			this.repositoryUrl = props.repositoryUrl;
			this.joomlaFolder = props.repositoryName;
			this.repositoryExisting = props.repositoryExisting;
			this.joomlaFolder = props.joomlaFolder;
			this.name = props.name;
			this.version = props.version;

			this.db_user = props.db_user;
			this.db_password = props.db_password;
			this.db_host = props.db_host;
			this.db_database = props.db_database;
			this.db_prefix = props.db_prefix;

			this.ftp_url = props.ftp_url;
			this.ftp_user = props.ftp_user;
			this.ftp_password = props.ftp_password;

			var str = random.string(20);

			props.secret = md5(str);

			this.config.defaults(props);

			done();
		}.bind(this));

	},

	writing: {

		app: function () {

			var done = this.async();
			var params = this.config.getAll();

			var ioFileOperations = function(src, dest, tpl)
			{

				if (tpl)
				{
					this.fs.copyTpl(
						this.templatePath(src),
						this.destinationPath(dest),
						params
					);
				}
				else
				{
					this.fs.copy(
						this.templatePath(src),
						this.destinationPath(dest)
					);
				}

			}.bind(this);;

			async.series([
					ioFileOperations('_package.json', 'package.json', true),
					ioFileOperations('_bower.json', 'bower.json', true),
					ioFileOperations('_gruntfile.js', 'gruntfile.js', true),
					ioFileOperations('_.ftppass', '.ftppass', true),
					ioFileOperations('_.gitignore', '.gitignore'),
					ioFileOperations('tasks/**/*', 'tasks/', false),
					ioFileOperations('index.html', 'database/index.html', false),
					ioFileOperations('index.html', 'build/index.html', false),
					ioFileOperations('editorconfig', '.editorconfig', false),
					ioFileOperations('jshintrc', '.jshintrc', false),
					ioFileOperations('_configuration.php', this.joomlaFolder + '/configuration.php', true),
					ioFileOperations('_htaccess.txt', this.joomlaFolder + '/.htaccess', false),
					ioFileOperations('README.md', 'README.md', false)
				]);

			done();
		},

		clone: function() {

			var params = this.config.getAll();

			this.log(yosay(	chalk.yellow('Acquiring Joomla CMS files')));

			this.finished = function() {

				this.log(yosay(chalk.yellow('Initializing GIT repository and commiting initial code...')));

				var initializeGitRepository = function()
				{

					cp.exec('git init', { cwd: this.path }, function(err, stdout, stderr) {

						if (err)
						{
							throw err;
						}

						this.log('Initialized GIT repository...');

					}.bind(this));

				}.bind(this);

				var addRemoteOrigin = function()
				{
					cp.exec('git remote add origin ' + this.repositoryUrl, { cwd: this.path }, function(err, stdout, stderr) {

						if (err)
						{
							throw err;
						}

						this.log('Added remote origin...');

					}.bind(this));

				}.bind(this);

				var commitReadMe = function()
				{
					cp.exec('git commit -m \'Initial commit with README.md\'', { cwd: this.path }, function(err, stdout, stderr) {

						if (err)
						{
							throw err;
						}

						this.log('Committed README.md...');

					}.bind(this));

				}.bind(this);


				var pushReadMe = function()
				{
					cp.exec('git push -u origin master', { cwd: this.path }, function(err, stdout, stderr) {

						if (err)
						{
							throw err;
						}

						this.log('Pushed README.md to origin...');

					}.bind(this));

				}.bind(this);


				var pushCodeBase = function()
				{
					cp.exec('git push --all', { cwd: this.path }, function(err, stdout, stderr) {

						if (err)
						{
							throw err;
						}

					}.bind(this));

					this.log('Pushed entire code package to repository...');

				}.bind(this);

				async.series([
						//initializeGitRepository(),
						//addRemoteOrigin(),
						//commitReadMe(),
						//pushReadMe(),
						//pushCodeBase()
					]);


				open(this.config.get('url') + '/administrator');

			}.bind(this);

			this.createUserCallBack = function(err, stdout, stderr) {

				if (err)
				{
					console.log(err);
					return false;
				}

				this.log(yosay(chalk.yellow('Administrator\'s Account Created')));

				var connection = mysql.createConnection({
					host: this.db_host,
					user: this.db_user,
					password: this.db_password,
					database: this.db_database
				});

				connection.connect();

				var activateUser = function()
				{
					connection.query('UPDATE `' + this.db_prefix + 'users` SET block=0,activation="" WHERE id=1', function(err, rows, fields) {
						if (err)
						{
							console.log(err);
							return false;
						}
					});

				}.bind(this);

				var updateUserGroup = function ()
				{
					connection.query('UPDATE `' + this.db_prefix + 'user_usergroup_map` SET group_id=8 WHERE user_id=1', function(err, rows, fields) {
						if (err)
						{
							console.log(err);
							return false;
						}
					});

				}.bind(this);

				var processTemplate = function(err, rows, fields) {

					if (err)
					{
						console.log(err);
						return false;
					}

					var values = {
						prefix: this.db_prefix,
						fields: rows[0]
					};

					console.log('Path: ', this.path);
					console.log('Template Path: ', this.templatePath());
					console.log('Destination Path: ', this.destinationPath());
					console.log('Values: ', values);

					this.fs.copyTpl(
						this.templatePath('_superuser.sql'),
						this.destinationPath('database/superuser.sql'),
						values
					);

				}.bind(this);

				var generateSuperUserScript = function()
				{
					connection.query('SELECT * FROM `' + this.db_prefix + 'users`', processTemplate);

				}.bind(this);

				async.series(
					[
						activateUser(),
						updateUserGroup(),
						generateSuperUserScript()
					]
				);

				connection.end();

				this.finished();

			}.bind(this);

			this.updateUserRegistrationSettingCallback = function() {

				this.log(yosay(chalk.yellow('User Self Registration Setting Adjusted')));

				cp.exec('casperjs installation.js --password=' + base.encode(this.websitePassword) + ' --email=' + this.websiteEmail + ' --url=' + this.url, { cwd: this.templatePath("tasks/scripts") }, this.createUserCallBack);

			}.bind(this);

			this.deleteInstallationDirectoryCallBack = function(err) {

				if (err)
				{
					console.log(err);
					return false;
				}

				this.log(yosay(chalk.yellow('Installation Folder Removed')));

				var connection = mysql.createConnection({
					host: this.db_host,
					user: this.db_user,
					password: this.db_password,
					database: this.db_database
				});

				connection.connect();

				connection.query('SELECT extension_id, params FROM `' + this.db_prefix + 'extensions` WHERE name="com_users"', function(err, rows, fields) {
					if (err)
					{
						console.log(err);
						return false;
					}

					var userParams = JSON.parse(rows[0].params);
					userParams.allowUserRegistration = '1';
					userParams = JSON.stringify(userParams);
					var extension_id = rows[0].extension_id;

					connection.query("UPDATE `" + this.db_prefix + "extensions` SET params='" + userParams + "' WHERE extension_id=" + extension_id, function(err, rows, fields) {

						if (err)
						{
							console.log(err);
							return false;
						}

						connection.end();

						this.updateUserRegistrationSettingCallback();

					}.bind(this));

				}.bind(this));

			}.bind(this);

			this.importCallBack = function(err) {

				if (err)
				{
					console.log(err);
					return false;
				}

				this.log(yosay(chalk.yellow('Database import complete')));

				rimraf(this.destinationRoot() + '/' + this.joomlaFolder + '/installation/', this.deleteInstallationDirectoryCallBack);

			}.bind(this);

			this.writeCallBack = function(err) {

				if (err)
				{
					console.log(err);
					return false;
					//done(err);
				}

				this.log(yosay(chalk.yellow('Running database script...')));

				cp.exec('mysql --user=' + this.db_user + ' --password=' + this.db_password + ' ' + this.db_database + ' < ' + 'joomla.sql',  { cwd: this.destinationPath + "/database" }, this.importCallBack);

			}.bind(this);

			this.replaceCallBack = function(err, data) {
				this.log(yosay(chalk.yellow('Replacing sql file prefixes with ' + this.db_prefix + '...')));

				if (err)
				{
					console.log(err);
					return false;
					//done(err);
				}

				data = data.replace(/#__/g, this.db_prefix);

				fs.writeFile('./database/joomla.sql', data, 'utf-8', this.writeCallBack);

			}.bind(this);

			this.cloneCallBack = function(err, repo) {

				if (err)
				{
					console.log(err);
					return false;
					//done(err);
				}

				this.log(yosay(chalk.yellow('Joomla CMS files acquired...')));

				var params = this.config.getAll();

				this.fs.copyTpl(
					this.templatePath('_configuration.php'),
					this.destinationPath(this.joomlaFolder + '/configuration.php'),
					params
				);

				this.fs.copy(
					this.templatePath('_htaccess.txt'),
					this.destinationPath(this.joomlaFolder + '/.htaccess')
				);

				fs.readFile('./' + this.joomlaFolder + '/installation/sql/mysql/joomla.sql', 'utf-8', this.replaceCallBack);

			}.bind(this);

			if (this.repositoryExisting)
			{

				Git.clone({
					repo: this.repositoryUrl,
					dir: this.joomlaFolder
				}, this.cloneCallBack);

			}
			else
			{

				var download = new Download({ extract: true, strip: 1, mode: '755' })
					.get('https://github.com/joomla/joomla-cms/archive/master.zip')
					.dest(this.destinationPath(this.joomlaFolder))
					.use(progress());

				download.run(function (err, files, stream) {

					if (err) {
						console.log(err);
						return false
						//done(err);
					}

					this.log(yosay(chalk.yellow('Joomla Files downloaded successfully!')));

					this.cloneCallBack(false, {});

				}.bind(this));
			}
		}
	},

	install: function() {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});