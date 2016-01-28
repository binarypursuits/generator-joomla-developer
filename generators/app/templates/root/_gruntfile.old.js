'use strict';

/*global module*/
var pkgData = require('./package.json');

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: '<json:package.json>',

		endpoints: [],
        joomla: {
            name: "<%= joomla.name %>",
            version: "<%= joomla.version %>",
            root: "<%= joomla.root %>",
            url: "<%= joomla.url %>",
            secret: "<%= joomla.secret %>",
            package: "<%= joomla.package %>"
        },
        administrator: {
            id: "<%= administrator.id %>",
            name: "<%= administrator.name %>",
            username: "<%= administrator.username %>",
            email: "<%= administrator.email %>"
        },
        database: {
            options: {
                host: "<%= database.host %>",
                username: "<%= database.username %>",
                password: "<%= database.password %>",
                database: "<%= database.database %>"
            },
            driver: "<%= database.driver %>",                  
            prefix: "<%= database.prefix %>"
        },
        
        development: {
            author: "<%= development.author %>",
            copyright: "<%= development.copyright %>",
            license: "<%= development.license %>",
            email: "<%= development.email %>",
            website: "<%= development.website %>",
            languagecode: "<%= development.languagecode %>"
        },

		jshint: {
			all: [],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				nonew: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: false,
				eqnull: true,
				node: true,
				strict: false,
				boss: false,
				browser: true,
				globals: {
					jQuery: true
				}
			}
		},

		csslint: {
			lax: {
				options: {
					import: false
				},
				src: []
			}
		},

		uglify: {
			media: {
				files: []
			}
		},

		cssmin: {
			media: {
				files: []
			}
		},

		compress: {
			media: {
				options: {
					mode: 'gzip'
				},
				files: [
					{
						expand: true,
						src: ['build/*.min.js'],
						dest: './',
						ext: '.min.js.gz'
					},
					{
						expand: true,
						src: ['build/*.min.css'],
						dest: './',
						ext: '.min.css.gz'
					}
				]
			}
		},

		clean: [
			'!build/index.html',
			'build/*js*',
			'build/*css*'
		],

		copy: {
			main: {
				files: []
			}
		}
            });
        
        
	grunt.registerTask('dump', 'Utility to dump variables for troubleshooting purposes.', function() {
		grunt.log.writeln('project root');
		var endpoints = grunt.config.get('endpoints');
		grunt.log.writeln('Endpoints:');
		//grunt.log.writeln(endpoints);
		console.log(endpoints);
		var js = grunt.config.get('jshint.all');
		var css = grunt.config.get('csslint.lax.src');

		grunt.log.writeln('JS Unique:');
		grunt.log.writeln(js);
		grunt.log.writeln('CSS Unique:');
		grunt.log.writeln(css);

		js = grunt.config.get('uglify.media.files');
		css = grunt.config.get('cssmin.media.files');

		grunt.log.writeln('JS Endpoint Files:');
		//grunt.log.writeln(js);
		console.log(js);
		grunt.log.writeln('CSS Endpoint Files:');
		//grunt.log.writeln(css);
		console.log(js);
	});

	grunt.registerTask('initialize', 'Set default values for build server credentials and directories', function() {
		var joomla = grunt.config.get('repository.joomla');
		var repo = grunt.config.get('repository.name');

		console.log('Joomla Folder: ', joomla);
		console.log('Repo Folder: ', repo);
		console.log('Source: ', '/home/brian.bolli/git/' + repo + '/' + joomla + '/**');
		console.log('Dest: ', '/srv/development/www/' + repo + '.arctg-build.cloudapp.net/public/');

	});

	grunt.loadTasks('./tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-azure');
	grunt.loadNpmTasks('grunt-s3');
	grunt.loadNpmTasks('grunt-mysql-dump-import');
	grunt.loadNpmTasks('grunt-sync');

	grunt.registerTask('update', ['initialize', 'sync']);

	grunt.registerTask('jenkins', ['initialize']);

	grunt.registerTask('cleanup', ['db_import', 'rename', 'open', 'dump']);

	grunt.registerTask('scrub', ['clean']);
	grunt.registerTask('endpoints', ['initialize', 'joomla-endpoints']);
	grunt.registerTask('init', ['endpoints', 'grunt-scrape']);
	grunt.registerTask('aws', ['s3']);
	//grunt.registerTask('test', ['init', 'jshint','csslint']);
	grunt.registerTask('test', ['init']);
	//grunt.registerTask('build', ['test', 'uglify', 'cssmin', 'compress', 'copy']);
	grunt.registerTask('build', ['test', 'scrub', 'uglify', 'cssmin', 'compress', 'copy', 'azure-blob-upload']);
	//grunt.registerTask('build', ['test', 'uglify', 'cssmin', 'compress', 'copy', 'aws']);
	grunt.registerTask('default', ['build']);

};