'use strict';

var generators = require('yeoman-generator');
var slugify = require('underscore.string/slugify');
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

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        // add option to skip install
        this.option('skip-install');
        this.slugify = slugify;
        
    },
    prompting: {
        joomla: function () {

            if (this.options.joomla !== undefined) {
                return true;
            }

            var done = this.async();
            
            var prompt = [{
                    type: 'input',
                    name: 'name',
                    message: 'Enter name for this Joomla instance:',
                    store: true
                },
                {
                    type: 'input',
                    name: 'version',
                    message: 'Enter version for this Joomla instance:',
                    "default": "0.1.0"
                },
                {
                    type: 'input',
                    name: 'root',
                    message: 'Enter name of sub-directory to act as root:',
                    "default": "webroot"
                },
                {
                    type: 'input',
                    name: 'url',
                    message: 'Enter local domain name for development off this Joomla instance (no http or https):',
                    store: true
                }];

            this.prompt(prompt, function (response) {
                var str = random.string(20);
                        
                this.options.secret = md5(str);
                this.options.package = response.name.replace(/\s+/g, '-').toLowerCase();
                
                this.options.extensions = {
                    components: [],
                    modules: [],
                    plugins: [],
                    templates: [],
                    libraries: [],
                    packages: [],
                };      
                  
                this.options.joomla = {
                    name: response.name,
                    version: response.version,
                    root: response.root,
                    url: response.url
                };
                
                done();
            }.bind(this));
        },
        administrator: function () {
           
            if (this.options.administrator !== undefined) {
                return true;
            }

            var done = this.async();
            
            var prompt = [{
                type: 'input',
                name: 'name',
                message: 'Enter administrator\'s name for this Joomla instance:',
                "default": "Webmaster"
            },
            {
                type: 'input',
                name: 'username',
                message: 'Enter administrator\'s username for this Joomla instance:',
                "default": "webmaster"
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter administrator\'s email for this Joomla instance:',
                store: true
            },
            {
                type: 'password',
                name: 'password',
                message: 'Enter administrator\'s password for this Joomla instance:',
                "default": "webmaster"
            }];

            this.prompt(prompt, function (response) {
                this.options.administrator = {
                    name: response.name,
                    username: response.username,
                    email: response.email,
                    password: response.password
                };
                               
                done();
            }.bind(this));
        },
        database: function () {
           
            if (this.options.database !== undefined) {
                return true;
            }

            var done = this.async();
            
            var prompt = [{
                type: 'list',
                name: 'driver',
                message: 'Choose database driver for this Joomla instance:',
                choices: [
                    'mysqli',
                    'mysql'
                ],
                "default": "mysqli"
            },
            {
                type: 'input',
                name: 'host',
                message: 'Enter database hose for this Joomla instance:',
                store: true
            },
            {
                type: 'input',
                name: 'username',
                message: 'Enter database username for this Joomla instance:',
                store: true
            },
            {
                type: 'input',
                name: 'password',
                message: 'Enter database user\'s password for this Joomla instance:',
                store: false
            },
            {
                type: 'input',
                name: 'database',
                message: 'Enter database name for this Joomla instance:',
                store: false
            },
            {
                type: 'input',
                name: 'prefix',
                message: 'Enter database prefix for this Joomla instance:',
                store: false
            }];

            this.prompt(prompt, function (response) {
                this.options.database = {
                    driver: response.driver,
                    database: response.database,
                    host: response.host,
                    username: response.username,
                    password: response.password,
                    prefix: response.prefix
                };
                done();
            }.bind(this));
        },
        repository: function()
        {
            var done = this.async(); 
            
            var prompt = [{
                type: 'list',
                name: 'repository',
                message: 'Choose option for repository:',
                choices: [
                    'none',
                    'new',
                    'existing'
                ],
                "default": "new"
            }];
        
            this.prompt(prompt, function (responses) {
                this.options.bower = responses.bower;
                done();
            }.bind(this));
        },
        newRepository: function()
        {
            // Short circuit if an option was explicitly specified
            if (this.options.repository !== 'new') {
                return true;
            }

            this.options.repository = true;          
            
        },
        existingRepository: function()
        {
            // Short circuit if an option was explicitly specified
            if (this.options.repository !== 'existing') {
                return true;
            }

            var done = this.async();     
            
            var prompt = [{
                type: 'input',
                name: 'url',
                message: 'Enter Git Repository URL for this Joomla development instance:',
                store: true
            }];

            this.prompt(prompt, function (responses) {
                this.options.repository = responses.url;
                done();
            }.bind(this));
            
        },
        development: function()
        {
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
        bower: function()
        {
            // Short circuit if an option was explicitly specified
            if (this.options.bower) {
              return true;
            }

            var done = this.async();
            
            var prompt = [{
              type: 'checkbox',
              name: 'bower',
              message: 'Select which bower packages to install version to install:',
              choices: [
                'jquery',
                'jquery-ui',
                'bootstrap',
                'normalize.css',                
                'fontawesome'
              ],
              store: true
            }];

            this.prompt(prompt, function (responses) {
              this.options.bower = responses.bower;
              done();
            }.bind(this));
        }
    },
    writing: {
        structure: function () {

            var done = this.async();

            var ioFileOperations = function (src, dest, tpl)
            {
                if (tpl)
                {
                    this.fs.copyTpl(
                        this.templatePath(src),
                        this.destinationPath(dest),
                        this.options
                    );
                }
                else
                {
                    this.fs.copy(
                        this.templatePath(src),
                        this.destinationPath(dest)
                    );
                }

            }.bind(this);

            async.series([
                ioFileOperations('_package.json', 'package.json', true),
                ioFileOperations('_bower.json', '.bowerc', true),
                ioFileOperations('_bower.json', 'bower.json', true),
                ioFileOperations('_gruntfile.js', 'gruntfile.js', true),
                ioFileOperations('_.ftppass', '.ftppass', true),
                ioFileOperations('_.gitignore', '.gitignore'),
                ioFileOperations('tasks/**/*', 'tasks/', false),
                ioFileOperations('index.html', 'database/index.html', false),
                ioFileOperations('index.html', 'build/index.html', false),
                ioFileOperations('editorconfig', '.editorconfig', false),
                ioFileOperations('jshintrc', '.jshintrc', false),
                ioFileOperations('_configuration.php', this.options.joomla.root + '/configuration.php', true),
                ioFileOperations('_htaccess.txt', this.options.joomla.root + '/.htaccess', false),
                ioFileOperations('README.md', 'README.md', false)
            ]);

            done();
        },
                        clone: function () {

                            var params = this.config.getAll();

                            this.log(yosay(chalk.yellow('Acquiring Joomla CMS files')));

                            this.finished = function () {

                                //this.log(yosay(chalk.yellow('Initializing GIT repository and commiting initial code...')));

                                var initializeGitRepository = function ()
                                {

                                    cp.exec('git init', {cwd: this.path}, function (err, stdout, stderr) {

                                        if (err)
                                        {
                                            this.log(err);
                                            return false;
                                        }

                                        this.log('Initialized GIT repository...');

                                    }.bind(this));

                                }.bind(this);

                                var addRemoteOrigin = function ()
                                {
                                    cp.exec('git remote add origin ' + this.repositoryUrl, {cwd: this.path}, function (err, stdout, stderr) {

                                        if (err)
                                        {
                                            this.log(err);
                                            return false;
                                        }

                                        this.log('Added remote origin...');

                                    }.bind(this));

                                }.bind(this);

                                var commitReadMe = function ()
                                {
                                    cp.exec('git commit -m \'Initial commit with README.md\'', {cwd: this.path}, function (err, stdout, stderr) {

                                        if (err)
                                        {
                                            this.log(err);
                                            return false;
                                        }

                                        this.log('Committed README.md...');

                                    }.bind(this));

                                }.bind(this);


                                var pushReadMe = function ()
                                {
                                    cp.exec('git push -u origin master', {cwd: this.path}, function (err, stdout, stderr) {

                                        if (err)
                                        {
                                            this.log(err);
                                            return false;
                                        }

                                        this.log('Pushed README.md to origin...');

                                    }.bind(this));

                                }.bind(this);


                                var pushCodeBase = function ()
                                {
                                    cp.exec('git push --all', {cwd: this.path}, function (err, stdout, stderr) {

                                        if (err)
                                        {
                                            this.log(err);
                                            return false;
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

                                this.log(yosay(chalk.yellow('Finished!')));

                                open('http://' + this.config.get('url') + '/administrator');

                            }.bind(this);

                            this.createUserCallBack = function (err, stdout, stderr) {

                                if (err)
                                {
                                    this.log(err);
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

                                var activateUser = function ()
                                {
                                    this.log(yosay(chalk.yellow('Activate User')));
                                    connection.query('UPDATE `' + this.db_prefix + 'users` SET block=0,activation="" WHERE id=1', function (err, rows, fields) {
                                        if (err)
                                        {
                                            this.log(err);
                                            return false;
                                        }
                                    });
                                }.bind(this);

                                var updateUserGroup = function ()
                                {
                                    this.log(yosay(chalk.yellow('Update User Group')));
                                    connection.query('UPDATE `' + this.db_prefix + 'user_usergroup_map` SET group_id=8 WHERE user_id=1', function (err, rows, fields) {
                                        if (err)
                                        {
                                            console.log(err);
                                            return false;
                                        }
                                    });

                                }.bind(this);

                                var processTemplate = function (err, rows, fields) {

                                    this.log(yosay(chalk.yellow('Process Template')));

                                    this.log('Rows: ', rows);

                                    if (err)
                                    {
                                        this.log(err);
                                        return false;
                                    }

                                    var values = {
                                        prefix: this.db_prefix,
                                        fields: rows[0]
                                    };

                                    this.log('Path: ', this.path);
                                    this.log('Template Path: ', this.templatePath());
                                    this.log('Destination Path: ', this.destinationPath());
                                    this.log('Values: ', values);

                                    this.fs.copyTpl(
                                            this.templatePath('_superuser.sql'),
                                            this.destinationPath('database/superuser.sql'),
                                            values
                                            );

                                }.bind(this);

                                var generateSuperUserScript = function ()
                                {
                                    var query_string = 'SELECT * FROM `' + this.db_prefix + 'users`';
                                    connection.query(query_string, processTemplate);

                                }.bind(this);

                                async.series(
                                        [
                                            activateUser(),
                                            updateUserGroup(),
                                            generateSuperUserScript(),
                                            connection.end()
                                        ]
                                        );

                                this.finished();

                            }.bind(this);

                            this.updateUserRegistrationSettingCallback = function () {

                                this.log(yosay(chalk.yellow('User Self Registration Setting Adjusted')));

                                cp.exec('casperjs installation.js --password=' + base.encode(this.websitePassword) + ' --email=' + this.websiteEmail + ' --url=' + this.url, {cwd: this.templatePath("tasks/scripts")}, this.createUserCallBack);

                            }.bind(this);

                            this.deleteInstallationDirectoryCallBack = function (err) {

                                if (err)
                                {
                                    this.log(err);
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

                                connection.query('SELECT extension_id, params FROM `' + this.db_prefix + 'extensions` WHERE name="com_users"', function (err, rows, fields) {
                                    if (err)
                                    {
                                        this.log(err);
                                        return false;
                                    }

                                    var userParams = JSON.parse(rows[0].params);
                                    userParams.allowUserRegistration = '1';
                                    userParams = JSON.stringify(userParams);
                                    var extension_id = rows[0].extension_id;

                                    connection.query("UPDATE `" + this.db_prefix + "extensions` SET params='" + userParams + "' WHERE extension_id=" + extension_id, function (err, rows, fields) {

                                        if (err)
                                        {
                                            this.log(err);
                                            return false;
                                        }

                                        connection.end();

                                        this.updateUserRegistrationSettingCallback();

                                    }.bind(this));

                                }.bind(this));

                            }.bind(this);

                            this.importCallBack = function (err) {

                                if (err)
                                {
                                    this.log(err);
                                    return false;
                                }

                                this.log(yosay(chalk.yellow('Database import complete')));

                                rimraf(this.destinationRoot() + '/' + this.joomlaFolder + '/installation/', this.deleteInstallationDirectoryCallBack);

                            }.bind(this);

                            this.writeCallBack = function (err) {

                                if (err)
                                {
                                    this.log(err);
                                    return false;
                                }

                                this.log(yosay(chalk.yellow('Running database script...')));

                                cp.exec('mysql --user=' + params.db_user + ' --password=' + params.db_password + ' ' + params.db_database + ' < ' + params.path + '/database/joomla.sql', this.importCallBack);

                            }.bind(this);

                            this.replaceCallBack = function (err, data) {
                                this.log(yosay(chalk.yellow('Replacing sql file prefixes...')));

                                if (err)
                                {
                                    this.log(err);
                                    return false;
                                }

                                data = data.replace(/#__/g, this.db_prefix);

                                fs.writeFile('./database/joomla.sql', data, 'utf-8', this.writeCallBack);

                            }.bind(this);

                            this.cloneCallBack = function (err, repo) {

                                if (err)
                                {
                                    this.log(err);
                                    return false;
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

                                var download = new Download({extract: true, strip: 1, mode: '755'})
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
    install: {
        download: function() {
    
        },
        dependencies: function () {
            this.installDependencies({
                skipInstall: this.options['skip-install']
            });
        }
    }
});