'use strict';

var generators = require('yeoman-generator');
var slugify = require('slugify');
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
var open = require('open');
var rimraf = require('rimraf');
var Download = require('download');
var progress = require('download-status');
var glob = require('glob');
var db = require('../../scripts/database');
var binPath = phantomjs.path;

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        // add option to skip install
        // this.option('skip-install');
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
                    "default": "Joomla",
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
                    "default": "joomla",
                    store: true
                }];

            this.prompt(prompt, function (response) {
                var str = random.string(20);
                
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
                    url: response.url,
                    secret: md5(str),
                    package: response.name.replace(/\s+/g, '_').toLowerCase()
                };
                
                this.config.set('joomla', this.options.joomla);  
                this.config.set('extensions', this.options.extensions);  
                
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
                    id: Math.floor(Math.random() * 99) + 1,
                    name: response.name,
                    username: response.username,
                    email: response.email,
                    password: response.password
                };
                this.config.set('administrator', this.options.administrator);   
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
                "default": "localhost",
                store: true
            },
            {
                type: 'input',
                name: 'username',
                message: 'Enter database username for this Joomla instance:',
                "default": "joomla",
                store: true
            },
            {
                type: 'input',
                name: 'password',
                message: 'Enter database user\'s password for this Joomla instance:',
                "default": "joomla",
                store: false
            },
            {
                type: 'input',
                name: 'database',
                message: 'Enter database name for this Joomla instance:',
                "default": "joomla",
                store: false
            },
            {
                type: 'input',
                name: 'prefix',
                message: 'Enter database prefix for this Joomla instance:',
                "default": "jdev_",
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
                this.config.set('database', this.options.database);   
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
                this.config.set('repository', this.options.repository);   
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
                
                this.config.set('development', this.options.development);   
                
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
              this.options.bower = (responses.bower) ? responses.bower : [];
              done();
            }.bind(this));
        }
    },
    writing: {
        repository: function() {              
            var done = this.async();
            this.log(yosay(chalk.yellow('End -> Repository')));
            // clone repository or get joomla master
            if (this.options.repository === 'existing')
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
        templates: function () {          
            this.log(yosay(chalk.yellow('End -> Templates')));
            
            this.fs.copy(this.templatePath('custom/index.html'), this.destinationPath('database/index.html'));
            this.fs.copy(this.templatePath('custom/index.html'), this.destinationPath('build/index.html'));
            this.fs.copyTpl(this.templatePath('custom/user.sql'), this.destinationPath('database/user.sql'), this.options);
            
            glob.sync('**', { cwd: this.templatePath('scripts') }).map(function (file) {
                this.fs.copyTpl(this.templatePath('scripts/' + file), this.destinationPath('scripts/' + file.replace(/^_/, '')), this.options);
            }, this);
            
            glob.sync('**', { cwd: this.templatePath('tasks') }).map(function (file) {
                this.fs.copyTpl(this.templatePath('tasks/' + file), this.destinationPath('tasks/' + file.replace(/^_/, '')), this.options);
            }, this);
            
            glob.sync('**', { cwd: this.templatePath('root') }).map(function (file) {
                this.fs.copyTpl(this.templatePath('root/' + file), this.destinationPath(file.replace(/^_/, '')), this.options);
            }, this);
            
            glob.sync('**', { cwd: this.templatePath('webroot/') }).map(function (file) {
                this.fs.copyTpl(this.templatePath('webroot/' + file), this.destinationPath(this.options.joomla.root + '/' + file.replace(/^_/, '')), this.options);
            }, this);
                        
            glob.sync('*.sql', { cwd: this.destinationPath(this.options.joomla.root + '/installation/sql/mysql') }).map(function (file) {
                this.fs.copy(this.destinationPath(this.options.joomla.root + '/installation/sql/mysql/' + file), this.destinationPath('database/' + file));
            }, this);
            
            var data = this.fs.read(this.destinationPath('database/joomla.sql'));
            this.fs.write(this.destinationPath('database/joomla.sql'), data.replace(/#__/g, this.options.database.prefix));
        },
        clean: function() {
            var done = this.async();
            
            // clean up installation folder
            this.log(yosay(chalk.yellow('End -> Clean')));

            rimraf(this.destinationPath(this.options.joomla.root + '/installation/'), done);
        }
    },
    install: {
 
        dependencies: function () {
            this.installDependencies({
                skipInstall: this.options['skip-install']
            });
        },
        import: function() {
            var done = this.async();
            
            // import joomla database
            this.log(yosay(chalk.yellow('Install -> Import -> Database')));

            cp.exec('mysql --user=' + this.options.database.username + ' --password=' + this.options.database.password + ' ' + this.options.database.database + ' < ' + this.destinationPath('database/joomla.sql'), function(error, stdout){
                
                if (error)
                {
                    done(error);
                }
                
                done();
                
            });
        },
        params: function() {
            var done = this.async();
            
            this.log(yosay(chalk.yellow('Install -> Params -> Set Global Registration Params')));

            db.create(this.options.database);
            
            var retrieveUserParamsCallback = function(error, rows, fields) {
                
                if (error)
                {
                    done(error);
                }
                
                var params = JSON.parse(rows[0].params);
                params.allowUserRegistration = '1';
                params = JSON.stringify(params);
                
                var extension_id = rows[0].extension_id;
                
                db.query("UPDATE `" + this.options.database.prefix + "extensions` SET params='" + params + "' WHERE extension_id=" + extension_id, done);
                
            }.bind(this);
           
            db.query('SELECT extension_id, params FROM `' + this.options.database.prefix + 'extensions` WHERE name="com_users"', retrieveUserParamsCallback);
        },
        administrator: function() {
            var done = this.async();
            
            this.log(yosay(chalk.yellow('Install -> Administra')));
            
            cp.exec('casperjs installation.js --password=' + base.encode(this.options.administrator.password) + ' --username=' + this.options.administrator.username + ' --email=' + this.options.administrator.email + ' --url=' + this.options.joomla.url, { cwd: this.destinationPath("scripts") }, done);
        }
    },
    end: {
        cleanup: function() {
            var done = this.async();
            
            // enable registration and set up administrators account
            this.log(yosay(chalk.yellow('End -> Cleanup')));
            
            var
                id, 
                databasePrefix = this.options.database.prefix,
                administrator = this.options.administrator;
            
            var finished = function(error, rows, fields) {
                this.log(yosay(chalk.yellow('End -> Cleanup -> Finished')));
                if (error)
                {
                    done(error);
                }
                
                db.close();
                done();
            }.bind(this);
            
            var updateAdministratorGroupCallback = function(error, rows, fields) {
                
                this.log(yosay(chalk.yellow('End -> Cleanup -> updateAdministratorGroupCallback')));
                
                // Get User ID for newly created administrator
                db.query("UPDATE `" + databasePrefix + "users` SET block=0,activation='' WHERE id=" + id, finished);
                
            }.bind(this);
            
            var captureAdministratorPrimaryKeyCallback = function(error, rows, fields) {
                
                this.log(yosay(chalk.yellow('End -> Cleanup -> captureAdministratorPrimaryKeyCallback')));
                
                console.log('rows -> ', rows);
                
                id = rows[0].id;
                
                // Get User ID for newly created administrator
                db.query("UPDATE `" + databasePrefix + "user_usergroup_map` SET group_id=8 WHERE user_id=" + id, updateAdministratorGroupCallback);
                
            }.bind(this);
                
            this.log(yosay(chalk.yellow('End -> Cleanup -> createUserCallBack')));
                
            // Get User ID for newly created administrator
            db.query("SELECT id FROM `" + databasePrefix + "users` WHERE username='" + administrator.username + "'", captureAdministratorPrimaryKeyCallback);
            
        },
        finished: function() {
            this.log(yosay(chalk.yellow('Finished!')));

            open('http://' + this.options.joomla.url + '/administrator');
        }
        
    }
});