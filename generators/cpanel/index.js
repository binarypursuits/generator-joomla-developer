'use strict';

var generators = require('yeoman-generator');
var slugify = require('slugify');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var cp = require('child_process');
var open = require('open');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        // add option to skip install
        // this.option('skip-install');
        this.slugify = slugify;
        
    },
	initializing: function () {
		cp.exec('chrome.exe --load-and-launch-app=/Users/Brian/git/joomla-developer-cpanel/app/', function(err, stdout, stderr){

			if (err)
			{
				console.log('Error: ', err);
				return false;
			}

		});
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
