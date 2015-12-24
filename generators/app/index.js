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
                    'new',
                    'existing'
                ],
                "default": "new"
            }];
        
            this.prompt(prompt, function (responses) {
                this.options.repository = responses.repository;
                done();
            }.bind(this));
        },
        newRepository: function()
        {
            // Short circuit if an option was explicitly specified
            if (this.options.repository === 'new') {
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
        templates: function () {
            
            this.fs.copy(this.templateRoot('/custom/index.html'), this.destinationPath('database/index.html'));
            this.fs.copy(this.templateRoot('/custom/index.html'), this.destinationPath('build/index.html'));
            
            glob.sync('**', { cwd: this.templateRoot('/scripts') }).map(function (file) {
                this.fs.copyTpl(file, this.destinationPath('/scripts'));
            }, this);
            
            glob.sync('**', { cwd: this.templateRoot('/tasks') }).map(function (file) {
                this.fs.copyTpl(file, this.destinationPath('/tasks'));
            }, this);
            
            glob.sync('**', { cwd: this.templatePath('/root') }).map(function (file) {
                this.fs.copyTpl(file, this.destinationPath(file.replace(/^_/, '')), this.options);
            }, this);
            
        },
        repository: function() {              
            var done = this.async();
            
            // clone repository or get joomla master
            if (this.options.repository)
            {
                Git.clone({
                    repo: this.options.repository,
                    dir: this.options.joomla.root
                }, done);

            }
            else
            {
                var download = new Download({extract: true, strip: 1, mode: '755'})
                    .get('https://github.com/joomla/joomla-cms/archive/master.zip')
                    .dest(this.destinationPath(this.options.joomla.root))
                    .use(progress());

                download.run(done);
            }
        },
        webroot: function() {
            var done = this.async();
            
            glob.sync('**', { cwd: this.sourceRoot('/templates/webroot') }).map(function (file) {
                this.fs.copyTpl(file, this.destinationPath('/' + this.options.joomla.root + '/' + file.replace(/^_/, '')), this.options);
            }, this);

            done();
        },
        parse: function() {
            var done = this.async();
            var destinationPath = this.destinationPath;
                        
            // process sql installation script for prefixes
            this.log(yosay(chalk.yellow('Replacing sql file prefixes...')));
            
            fs.readFile('./' + this.joomlaFolder + '/installation/sql/mysql/joomla.sql', 'utf-8', function(error, data){
                if (error)
                {
                    done(error);
                }
                
                data = data.replace(/#__/g, this.options.databasePrefix);
                fs.writeFile(destinationPath('/database/joomla.sql'), data, 'utf-8', done);                
            });
        },
        import: function() {
            var done = this.async();
            
            // import joomla database
            this.log(yosay(chalk.yellow('Running database script...')));

            cp.exec('mysql --user=' + this.options.database.user + ' --password=' + this.options.database.password + ' ' + this.options.database.database + ' < ' + this.destinationPath('/database/joomla.sql'), done);
        },
        clean: function() {
            var done = this.async();
            
            // clean up installation folder
            this.log(yosay(chalk.yellow('Database import complete')));

            rimraf(this.destinationRoot() + '/' + this.options.joomla.root + '/installation/', done);
        },
        administrator: function() {
            var done = this.async();
            
            // enable registration and set up administrators account
            var db = require('../../modules/database');
            db.create(this.options.database);
            
            var
                id, 
                databasePrefix = this.options.database.prefix,
                administrator = this.options.administrator;
            
            var finished = function(error, rows, fields) {
                if (error)
                {
                    done(error);
                }
                
                db.close();
                done();
            }
            
            var updateUserGroupCallback = function (error, rows, fields) {
                if (error)
                {
                    done(error);
                }
                
                db.query('UPDATE `' + databasePrefix + 'user_usergroup_map` SET group_id=8 WHERE user_id=' + id, finished);
            }
            
            var grabAdministratorUserIdCallback = function(error, rows, fields) {
                if (error)
                {
                    done(error);
                }
                
                console.log(rows);
                
                id = rows[0].id;
                
                db.query('UPDATE `' + databasePrefix + 'users` SET block=0, activation="" WHERE id=' + id, updateUserGroupCallback);
            }
            
            var createUserCallback = function (error, rows, fields) {
                if (error)
                {
                    done(error);
                }
                
                db.query('SELECT id FROM `' + databasePrefix + '_users` WHERE username="' + administrator.username + '"', grabAdministratorUserIdCallback)
            }
            
            var updateUserParamsCallback = function(error, stdout, stderr) {
                if (error)
                {
                    done(error);
                }
                
                cp.exec('casperjs installation.js --password=' + base.encode(administrator.password) + ' --email=' + administrator.email + ' --url=' + this.url, { cwd: this.templatePath("/scripts") }, createUserCallback);
            }
            
            var retrieveUserParamsCallback = function(error, rows, fields) {
                if (error)
                {
                    done(error);
                }
                
                var params = JSON.parse(rows[0].params);
                params.allowUserRegistration = '1';
                params = JSON.stringify(params);
                
                var extension_id = rows[0].extension_id;
                
                db.query("UPDATE `" + databasePrefix + "extensions` SET params='" + params + "' WHERE extension_id=" + extension_id, updateUserParamsCallback)
            }
           
            db.query('SELECT extension_id, params FROM `' + databasePrefix + 'extensions` WHERE name="com_users"', retrieveUserParamsCallback);
        },
        git: function() {
            var done = this.async();
            
            // initial push of code
            var initializeGitRepository = function () {
                cp.exec('git init', {cwd: this.destinationPath()}, addRemoteOrigin);
            }

            var addRemoteOrigin = function (error, stdout, stderr) {
                if (error)
                {
                    done(error);
                }
                
                cp.exec('git remote add origin ' + this.repositoryUrl, {cwd: this.path}, function (err, stdout, stderr) {

                

                    this.log('Added remote origin...');

                }.bind(this));

            }.bind(this);

            var commitReadMe = function (error, stdout, stderr) {
                if (error)
                {
                    done(error);
                }
                
                cp.exec('git commit -m \'Initial commit with README.md\'', {cwd: this.path}, function (err, stdout, stderr) {

                
                    this.log('Committed README.md...');

                }.bind(this));

            }.bind(this);


            var pushReadMe = function (error, stdout, stderr) {
                if (error)
                {
                    done(error);
                }
                cp.exec('git push -u origin master', {cwd: this.path}, function (err, stdout, stderr) {

                   
                    this.log('Pushed README.md to origin...');

                }.bind(this));

            }.bind(this);


            var pushCodeBase = function (error, stdout, stderr) {
                if (error)
                {
                    done(error);
                }
                
                cp.exec('git push --all', {cwd: this.path}, function () {

                 
                });
            }
            
            
        },
        finished: function() {
           this.log(yosay(chalk.yellow('Finished!')));

            open('http://' + this.config.get('url') + '/administrator');
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