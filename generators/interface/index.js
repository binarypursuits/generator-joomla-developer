'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var cp = require('child_process');
var open = require('open');

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
		this.pkg = require('../package.json');
		cp.exec('node server.js', { cwd: './interface/app' }, function(err, stdout, stderr){

			if (err)
			{
				console.log('Error: ', err);
				return false;
			}

			open('http://localhost:1337/');
		});
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
