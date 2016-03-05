"use strict";

var generators = require("yeoman-generator");
var slugify = require("slugify");
var chalk = require("chalk");
var yosay = require("yosay");
var glob = require('glob');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
		
		this.questions = this.fs.readJSON(__dirname + "/../prompts/questions.json");

        // add option to skip install
        // this.option("skip-install");
        this.slugify = slugify;
        
    },
	prompting: {		
		component: function() {
		
			if (this.options.joomla !== undefined) {
                return true;
            }

			var done = this.async();

			var prompt =
			[
				{
					type : "input",
					name : "camelcase",
					message : "What is name of the new component using CamelCase formatting?",
					store : true
				},
				{
					type : "confirm",
					name : "configJson",
					message : "User config.json to build MVC paths?",
					store : true,
					"default": true
				}
			];

			this.prompt(prompt, function (response) {

				this.options.component = {
					formal: response.camelcase,
					camelcase: response.camelcase.replace(/\s+/g, ""),
					name: response.camelcase.replace(/\s+/g, "").toLowerCase(),
					uppercase: response.camelcase.replace(/\s+/g, "").toUpperCase()
				};

				done();

			}.bind(this));
		},
		overrides: function() {
			
			if (this.options.joomla !== undefined) {
                return true;
            }
			
			var done = this.async();
			
			var prompt = this.questions.overrides;
			
			this.prompt(prompt, function (response) {
				
				if (response.overrides.indexOf('development') === -1)
				{
					this.options.development = this.config.get('development');
				}
				
				if (response.overrides.indexOf('media') === -1)
				{
					this.options.media = this.config.get('media');
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
		media: function() {
			
			if (this.options.media !== undefined) {
                return true;
            }

			var done = this.async();

			var prompt = this.questions.media;

			this.prompt(prompt, function (response) {

				this.options.media = response.media;

				done();

			}.bind(this));
		},
		mvc: function() {
			if (this.options.mvc !== undefined) {
                return true;
            }

			var done = this.async();

			var prompt = this.questions.mvc;

			this.prompt(prompt, function (response) {

				this.options.mvc = response.mvc;

				done();

			}.bind(this));
		},
		generic: function() {
			if (this.options.mvc !== "generic") {
                return true;
            }

			var done = this.async();

			var prompt = this.questions.names.generic;

			this.prompt(prompt, function (response) {

				this.options.generic = {
					name: response.generic
				};

				done();

			}.bind(this));
		},
		listedit: function() {
			if (this.options.mvc !== "listedit") {
                return true;
            }

			var done = this.async();

			var prompt = this.questions.names.listedit;

			this.prompt(prompt, function (response) {

				this.options.listmvc = {
					formal: response.listedit.list,
					camelcase: response.listedit.list.replace(/\s+/g, ""),
					name: response.listedit.list.replace(/\s+/g, "").toLowerCase(),
					uppercase: response.listedit.list.replace(/\s+/g, "").toUpperCase()
				};

				this.options.editmvc = {
					formal: response.listedit.edit,
					camelcase: response.listedit.edit.replace(/\s+/g, ""),
					name: response.listedit.edit.replace(/\s+/g, "").toLowerCase(),
					uppercase: response.listedit.edit.replace(/\s+/g, "").toUpperCase()
				};

				done();

			}.bind(this));
		},
		fields: function() {
			
			if (this.options.mvc !== "listedit") {
                return true;
            }

			var done = this.async();

			var prompt = this.questions.fields;

			this.prompt(prompt, function (response) {

				this.options.fields = response.fields;

				done();

			}.bind(this));
		}
	},
	writing: {
		component: function (done) {
			
			var config = this.config.getAll();
			
			var createFolders = function(done) {
				
				var index = '**/index.html';
				
				if (!done)
				{
					index = '**/*index.html';
				}
				
				var path = config.joomla.root + "/administrator/components/com_" + this.options.component.name + "/";
				glob.sync(index, { cwd: this.templatePath('admin/') }).map(function (file) {
					this.fs.copyTpl(this.templatePath('admin/' + file), this.destinationPath(path + file), this.options);
				}, this);
				
				path = config.joomla.root + "/components/com_" + this.options.component.name + "/";
				glob.sync(index, { cwd: this.templatePath('site/') }).map(function (file) {
					this.fs.copyTpl(this.templatePath('site/' + file), this.destinationPath(path + file), this.options);
				}, this);
				
				path = config.joomla.root + "/media/com_" + this.options.component.name + "/";
				glob.sync(index, { cwd: this.templatePath('media/') }).map(function (file) {
					
					var test = file.replace('/index.html','');
					if (this.options.media.indexOf(test) > -1)
					{
						this.fs.copyTpl(this.templatePath('media/' + file), this.destinationPath(path + file), this.options);
					}
					
				}, this);
				
				if (done)
				{
					done();
				}
				
			}.bind(this);
			
			var processGlobPattern = function(pattern, replace, replacement) {
				
				var path = config.joomla.root + "/administrator/components/com_" + this.options.component.name + "/";
				glob.sync(pattern, { cwd: this.templatePath('admin/') }).map(function (file) {
					this.fs.copyTpl(this.templatePath('admin/' + file), this.destinationPath(path + file.replace(replace, replacement)), this.options);
				}, this);
				
				path = config.joomla.root + "/components/com_" + this.options.component.name + "/";
				glob.sync(pattern, { cwd: this.templatePath('site/') }).map(function (file) {
					this.fs.copyTpl(this.templatePath('site/' + file), this.destinationPath(path + file.replace(replace, replacement)), this.options);
				}, this);
				
			}.bind(this);
		
			if (this.options.mvc === "none")
			{
				createFolders(done);
			}
			else
			{
				createFolders(false);
			}

			var createGenericMVC = function(done) {
				
				processGlobPattern('**/_generic.php', '_generic', this.options.generic.name);
				done();
				
			}.bind(this);
			
			var createListViewEditMVC = function(done) {
				processGlobPattern('**/_list.php', '_list', this.options.list.name);
				processGlobPattern('**/_edit.php', '_edit', this.options.edit.name);
				done();
				
			}.bind(this);
			

			var done = this.async();
			var months = ["January", "February", "March", "April","May","June","July","August","September","October","November","December"];
			var date = new Date();
			
			var adminPath = this.options.joomla.root + "/administrator/components/com_" + this.options.component.name + "/";

            glob.sync('**', { cwd: this.templatePath('admin') }).map(function (file) {
                this.fs.copyTpl(this.templatePath('admin/' + file), this.destinationPath(adminPath + file.replace(/^_/, '')), this.options);
            }, this);
			/*
			var params = {
					formal: {
						component: this.component_formal,
						listview: null,
						detailview: null
					},
					component: this.camelcase.toLowerCase(),
					author: this.author || this.config.get("author"),
					created: months[date.getMonth()] + " " + date.getFullYear(),
					copyright: this.copyright || this.config.get("copyright"),
					license: this.license || this.config.get("license"),
					email: this.email || this.config.get("email"),
					website: this.website || this.config.get("website"),
					version: "0.0.0",
					description: this.description,
					uppercase: this.camelcase.toUpperCase(),
					camelcase: this.camelcase,
					languagefile: true,
					languagecode: this.languagecode || this.config.get("languagecode"),
					rootPath: this.config.get("joomlaFolder") || "webroot",
					updateserver: false,
					icon: false,
					media: {
						css: true,
						js: true,
						images: true
					},
					acl: true,
					db: {
						fields: {
							categories: true,
							publish: true,
							timestamp: true,
							urls: true,
							metadata: true,
							description: true,
							params: true,
							images: true,
							language: true,
							tags: true,
							versions: true,
							ordering: true
						}
					},
					views: {
						bare: (this.configJson) ? false : true,
						standard: (this.configJson) ? this.fs.readJSON(this.templatePath("configurations/config.json")) : []
					}
				};

			var jsonConfig = false;

			var ioFileOperations = function(template, destination, useParams)
			{
				if (useParams)
				{
					this.fs.copyTpl(
						this.templatePath(template),
						this.destinationPath(destination),
						params
					);
				}
				else
				{
					this.fs.copyTpl(
						this.templatePath(template),
						this.destinationPath(destination)
					);
				}

			}.bind(this);

			var components = this.config.get("components");
			components.push(params);
			this.config.set("components", components);

			async.series([
				ioFileOperations("_manifest.xml", params.rootPath + "/administrator/components/com_" + params.component + "/" + params.component + ".xml", true),
				ioFileOperations("_admin_component.php", params.rootPath + "/administrator/components/com_" + params.component + "/" + params.component + ".php", true),
				ioFileOperations("_admin_controller.php", params.rootPath + "/administrator/components/com_" + params.component + "/controller.php", true),
				ioFileOperations("_access.xml", params.rootPath + "/administrator/components/com_" + params.component + "/access.xml", true),
				ioFileOperations("_config.xml", params.rootPath + "/administrator/components/com_" + params.component + "/config.xml", true),
				ioFileOperations("_admin_helper.php", params.rootPath + "/administrator/components/com_" + params.component + "/helpers/" + params.component + ".php", true),
				ioFileOperations("index.html", params.rootPath + "/administrator/components/com_" + params.component + "/index.html"),
				ioFileOperations("index.html", params.rootPath + "/administrator/components/com_" + params.component + "/index.html"),
				ioFileOperations("index.html", params.rootPath + "/administrator/components/com_" + params.component + "/helpers/index.html"),
				ioFileOperations("index.html", params.rootPath + "/administrator/components/com_" + params.component + "/models/index.html"),
				ioFileOperations("index.html", params.rootPath + "/administrator/components/com_" + params.component + "/models/forms/index.html"),
				ioFileOperations("index.html", params.rootPath + "/administrator/components/com_" + params.component + "/views/index.html"),
				ioFileOperations("index.html", params.rootPath + "/components/com_" + params.component + "/index.html"),
				ioFileOperations("index.html", params.rootPath + "/components/com_" + params.component + "/controllers/index.html"),
				ioFileOperations("index.html", params.rootPath + "/components/com_" + params.component + "/models/index.html"),
				ioFileOperations("index.html", params.rootPath + "/components/com_" + params.component + "/models/forms/index.html"),
				ioFileOperations("index.html", params.rootPath + "/components/com_" + params.component + "/views/index.html"),
				ioFileOperations("index.html", params.rootPath + "/components/com_" + params.component + "/index.html")
			]);

			if (params.views.standard.length > 0)
			{

				for (var i = 0; i < params.views.standard.length; i++)
				{
					params.index = i;


					// List View Files
					async.series([
						ioFileOperations("_admin_list_controller.php", params.rootPath + "/administrator/components/com_" + params.component + "/controllers/" + params.views.standard[i].listview.lowercase + ".php", true),
						ioFileOperations("_admin_list_model.php", params.rootPath + "/administrator/components/com_" + params.component + "/models/" + params.views.standard[i].listview.lowercase + ".php", true),
						ioFileOperations("_admin_list_view.php", params.rootPath + "/administrator/components/com_" + params.component + "/views/" +  params.views.standard[i].listview.lowercase + "/view.html.php", true),
						ioFileOperations("_admin_list_default.php", params.rootPath + "/administrator/components/com_" + params.component + "/views/" + params.views.standard[i].listview.lowercase + "/tmpl/default.php", true),
						ioFileOperations("_admin_list_default_batch.php", params.rootPath + "/administrator/components/com_" + params.component + "/views/" + params.views.standard[i].listview.lowercase + "/tmpl/default_batch.php", true),
						ioFileOperations("index.html", params.rootPath + "/administrator/components/com_" + params.component + "/views/" +  params.views.standard[i].listview.lowercase + "/index.html"),
						ioFileOperations("index.html", params.rootPath + "/administrator/components/com_" + params.component + "/views/" + params.views.standard[i].listview.lowercase + "/tmpl/index.html")
					]);

					// Detail View Files
					async.series([
						ioFileOperations("_admin_edit_controller.php", params.rootPath + "/administrator/components/com_" + params.component + "/controllers/" + params.views.standard[i].detailview.lowercase + ".php", true),
						ioFileOperations("_admin_edit_model.php", params.rootPath + "/administrator/components/com_" + params.component + "/models/" + params.views.standard[i].detailview.lowercase + ".php", true),
						ioFileOperations("_form.xml", params.rootPath + "/administrator/components/com_" + params.component + "/models/forms/" + params.views.standard[i].detailview.lowercase + ".xml", true),
						ioFileOperations("_table.php", params.rootPath + "/administrator/components/com_" + params.component + "/tables/" + params.views.standard[i].detailview.lowercase + ".php", true),
						ioFileOperations("_admin_edit_view.php", params.rootPath + "/administrator/components/com_" + params.component + "/views/" + params.views.standard[i].detailview.lowercase + "/view.html.php", true),
						ioFileOperations("_admin_edit.php", params.rootPath + "/administrator/components/com_" + params.component + "/views/" + params.views.standard[i].detailview.lowercase + "/tmpl/edit.php", true),
						ioFileOperations("_admin_edit_params.php", params.rootPath + "/administrator/components/com_" + params.component + "/views/" + params.views.standard[i].detailview.lowercase + "/tmpl/edit_params.php", true),
						ioFileOperations("_admin_edit_metadata.php", params.rootPath + "/administrator/components/com_" + params.component + "/views/" + params.views.standard[i].detailview.lowercase + "/tmpl/edit_metadata.php", true),
						ioFileOperations("_site_controller_detailview.php", params.rootPath + "/components/com_" + params.component + "/controllers/" + params.views.standard[i].detailview.lowercase + ".php", true),
						ioFileOperations("_site_model_detailview.php", params.rootPath + "/components/com_" + params.component + "/models/" + params.views.standard[i].detailview.lowercase + ".php", true),
						ioFileOperations("_site_form_detailview.xml", params.rootPath + "/components/com_" + params.component + "/models/forms/" + params.views.standard[i].detailview.lowercase + ".xml", true),
						ioFileOperations("_site_view_detailview.php", params.rootPath + "/components/com_" + params.component + "/views/" + params.views.standard[i].detailview.lowercase + "/view.html.php", true),
						ioFileOperations("_site_view_detailview_edit.php", params.rootPath + "/components/com_" + params.component + "/views/" + params.views.standard[i].detailview.lowercase + "/tmpl/edit.php", true),
						ioFileOperations("_site_view_detailview_default.php", params.rootPath + "/components/com_" + params.component + "/views/" + params.views.standard[i].detailview.lowercase + "/tmpl/default.php", true),
						ioFileOperations("_site_view_detailview_default.xml", params.rootPath + "/components/com_" + params.component + "/views/" + params.views.standard[i].detailview.lowercase + "/tmpl/default.xml", true),
						ioFileOperations("index.html", params.rootPath + "/administrator/components/com_" + params.component + "/sql/index.html"),
						ioFileOperations("index.html", params.rootPath + "/administrator/components/com_" + params.component + "/tables/index.html"),
						ioFileOperations("index.html", params.rootPath + "/administrator/components/com_" + params.component + "/views/" + params.views.standard[i].detailview.lowercase + "/index.html"),
						ioFileOperations("index.html", params.rootPath + "/administrator/components/com_" + params.component + "/views/" + params.views.standard[i].detailview.lowercase + "/tmpl/index.html"),
						ioFileOperations("index.html", params.rootPath + "/components/com_" + params.component + "/views/" + params.views.standard[i].detailview.lowercase + "/index.html")
					]);

					if (params.db.fields.categories)
					{
						async.series([
							ioFileOperations("_site_model_categories.php", params.rootPath + "/components/com_" + params.component + "/models/categories.php", true),
							ioFileOperations("_site_model_category.php", params.rootPath + "/components/com_" + params.component + "/models/category.php", true),
							ioFileOperations("_site_view_categories.php", params.rootPath + "/components/com_" + params.component + "/views/categories/view.html.php", true),
							ioFileOperations("_site_view_category.php", params.rootPath + "/components/com_" + params.component + "/views/category/view.html.php", true),
							ioFileOperations("_site_view_category_feed.php", params.rootPath + "/components/com_" + params.component + "/views/category/view.feed.php", true),
							ioFileOperations("_site_view_categories_default.php", params.rootPath + "/components/com_" + params.component + "/views/categories/tmpl/default.php", true),
							ioFileOperations("_site_view_categories_default_items.php", params.rootPath + "/components/com_" + params.component + "/views/categories/tmpl/default_items.php", true),
							ioFileOperations("_site_view_categories_default.xml", params.rootPath + "/components/com_" + params.component + "/views/categories/tmpl/default.xml", true),
							ioFileOperations("_site_view_category.php", params.rootPath + "/components/com_" + params.component + "/views/category/view.html.php", true),
							ioFileOperations("_site_view_category_default.php", params.rootPath + "/components/com_" + params.component + "/views/category/tmpl/default.php", true),
							ioFileOperations("_site_view_category_default_items.php", params.rootPath + "/components/com_" + params.component + "/views/category/tmpl/default_items.php", true),
							ioFileOperations("_site_view_category_default_children.php", params.rootPath + "/components/com_" + params.component + "/views/category/tmpl/default_children.php", true),
							ioFileOperations("_site_view_category_default.xml", params.rootPath + "/components/com_" + params.component + "/views/category/tmpl/default.xml", true),
							ioFileOperations("index.html", params.rootPath + "/components/com_" + params.component + "/views/categories/index.html"),
							ioFileOperations("index.html", params.rootPath + "/components/com_" + params.component + "/views/category/index.html"),
							ioFileOperations("index.html", params.rootPath + "/components/com_" + params.component + "/views/categories/tmpl/index.html"),
							ioFileOperations("index.html", params.rootPath + "/components/com_" + params.component + "/views/category/tmpl/index.html")
						]);

					}

				}

			}

			if (params.views.standard.length > 0)
			{
				async.series([
					ioFileOperations("_install.mysql.utf8.sql", params.rootPath + "/administrator/components/com_" + params.component + "/sql/install.mysql.utf8.sql", true),
					ioFileOperations("_uninstall.mysql.utf8.sql", params.rootPath + "/administrator/components/com_" + params.component + "/sql/uninstall.mysql.utf8.sql", true)
				]);
			}


			// Need to cycle through views to generate required language definitions
			// Template admin language files
			if (params.languagefile === true && typeof params.languagecode !== "undefined")
			{
				async.series([
					ioFileOperations("_admin_language.ini", params.rootPath + "/administrator/language/" + params.languagecode + "/" + params.languagecode + ".com_" + params.component + ".ini", true),
					ioFileOperations("_admin_language.sys.ini", params.rootPath + "/administrator/language/" + params.languagecode + "/" + params.languagecode + ".com_" + params.component + ".sys.ini", true)
				]);
			}

			if (params.languagefile === true && typeof params.languagecode !== "undefined")
			{
				async.series([
					ioFileOperations("_site_language.ini", params.rootPath + "/language/" + params.languagecode + "/" + params.languagecode + ".com_" + params.component + ".ini", true)
				]);
			}

			// Generate Media component files
			if (params.media)
			{
				var mediaFiles = [];

				mediaFiles.push(ioFileOperations("index.html", params.rootPath + "/media/com_" + params.component + "/index.html"));

				if (params.media.css)
				{
					mediaFiles.push(ioFileOperations("index.html", params.rootPath + "/media/com_" + params.component + "/css/index.html"));
				}

				if (params.media.js)
				{
					mediaFiles.push(ioFileOperations("index.html", params.rootPath + "/media/com_" + params.component + "/js/index.html"));
				}

				if (params.media.images)
				{
					mediaFiles.push(ioFileOperations("index.html", params.rootPath + "/media/com_" + params.component + "/images/index.html"));
				}

				async.series(mediaFiles);
			}
			*/
			done();
		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options["skip-install"]
		});
	}
});
