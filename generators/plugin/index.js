"use strict";

var generators = require("yeoman-generator");
var slugify = require("slugify");
var chalk = require("chalk");
var yosay = require("yosay");
var glob = require('glob');

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

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
		
		this.questions = this.fs.readJSON(__dirname + "/../prompts/questions.json");

        // add option to skip install
        // this.option("skip-install");
        this.slugify = slugify;
        
    },
	prompting: {
        plugin: function() {
            var done = this.async();
			
            var prompts =
            [
                {
                    type : "input",
                    name : "camelcase",
                    message : "What is name of the new plugin using CamelCase formatting?",
                    store : true
                },
				{
                    type : "input",
                    name : "description",
                    message : "Enter a brief description of the plugin?",
					"default" : "Custom Joomla plugin.",
                    store : true
                },
				{
                    type : "input",
                    name : "version",
                    message : "Enter starting version for this plugin?",
                    "default" : "0.1.0"
                },
                {
                    type : "confirm",
                    name : "languagefile",
                    message : "Create language files for your plugin?",
                    "default" : true,
                    store : true
                },
				{
					type : "confirm",
					name : "development",
					message : "Override default development settings?",
					"default": false
				}
			];
			
			this.prompt(prompts, function (response) {
				
				var months = ["January", "February", "March", "April","May","June","July","August","September","October","November","December"];
				var date = new Date();		
				
				this.options.plugin = {
					formal: response.camelcase,
					camelcase: response.camelcase.replace(/\s+/g, ""),
					name: response.camelcase.replace(/\s+/g, "").toLowerCase(),
					uppercase: response.camelcase.replace(/\s+/g, "").toUpperCase(),
					languagefile: response.languagefile,
					created: months[date.getMonth()] + ' ' + date.getFullYear(),
					version: response.version					
				};
				
				if (response.development)
				{
					this.options.development = false;
				}
				else
				{
					this.options.development = this.config.get('development');
				}

				done();

			}.bind(this));
        },
		development: function() {
			
			if (this.options.development !== undefined) {
                return true;
            }

			var done = this.async();

			var prompts = this.questions.development;

			this.prompt(prompts, function (response) {

				this.options.development = response;

				done();

			}.bind(this));
		},
        type: function() {
            
            var done = this.async();
            
            var prompts = this.questions.plugin;
                        
            this.prompt(prompts, function (response) {
                
                this.options.plugin.type = {
					name: response.type,
					camelcase: response.type.charAt(0).toUpperCase() + response.type.slice(1),
					uppercase: response.type.toUpperCase()
				};
                
                done();
                
            }.bind(this));
        },
        methods: function() {
            var done = this.async();
            
			var prompts = this.questions[this.options.plugin.type.name];
			
            this.prompt(prompts, function (response) {
                
                this.options.methods = response.methods;
				
				done();
                
            }.bind(this));
        }
	},

	writing: {
		plugin: function () {
			
			var config = this.config.getAll();
			var path = config.joomla.root + "/plugins/" + this.options.plugin.type.name + "/" + this.options.plugin.name + "/";
			
			glob.sync("index.html", { cwd: this.templatePath() }).map(function (file) {
				this.fs.copyTpl(this.templatePath(file), this.destinationPath(path + file), this.options);
			}, this);
			
			if (this.options.plugin.languagefile)
			{
				glob.sync("**", { cwd: this.templatePath('language/') }).map(function (file) {
					this.fs.copyTpl(
						this.templatePath('language/' + file), 
						this.destinationPath(path + file.replace(
							"_language",
							"language/" + this.options.development.languagecode + 
							"/" + this.options.development.languagecode + ".plg_" + 
							this.options.plugin.type.name + "_" + this.options.plugin.name)
						), this.options);
				}, this);	
			}
				
			this.fs.copyTpl(this.templatePath('_plugin.php'), this.destinationPath(path + this.options.plugin.name + ".php"), this.options);
			this.fs.copyTpl(this.templatePath('_manifest.xml'), this.destinationPath(path + this.options.plugin.name + ".xml"), this.options);

		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options["skip-install"]
		});
	}
});
