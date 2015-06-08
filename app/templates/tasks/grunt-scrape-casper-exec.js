'use-strict'

var exec = require('child_process').exec;
var base = require('js-base64').Base64;

module.exports = function(grunt) {

	grunt.registerTask('grunt-scrape-casper-exec', 'Execute casper script to pull CSS and JS files.', function(i, length) {
		grunt.log.writeln('Scrapping endpiont ' + (parseInt(i) + 1) + ' of ' + length + '...');
		var done = this.async();
		var baseUrl = grunt.config.get('url');
		var endpoints = grunt.config.get('endpoints');
		var link = baseUrl + "/" + endpoints[i];

		var css = grunt.config.get('assets.css.custom');
		var js = grunt.config.get('assets.js.custom');
		var css_all = grunt.config.get('assets.css.all');
		var js_all = grunt.config.get('assets.js.all');

		var rootPath = grunt.config.get('repository.path') + '/' + grunt.config.get('repository.joomla');

		exec('casperjs scrape.js --url=' + base.encode(link) + ' --web-security=false', { cwd: grunt.config.get('repository.path') + "/tasks/scripts" }, function (error, stdout, stderr) {

			if (error)
			{
				throw error;
			}
			else
			{
				var obj = JSON.parse(stdout);
				var url = grunt.config.get('url');

				for (var i = 0; i < obj.js.length; i++)
				{
					var file_name = obj.js[i].replace(url, '');
					if (file_name.indexOf('http') === -1)
					{
						if (js_all.indexOf(rootPath + file_name) === -1)
						{
							js_all.push(rootPath + file_name);
						}

						if (file_name.indexOf('/media/system') === -1 && file_name.indexOf('/media/jui') === -1 && file_name.indexOf('modernizr') === -1)
						{
							if (js.indexOf(rootPath + file_name) === -1)
							{
								js.push(rootPath + file_name);
							}
						}
					}
					else
					{
						grunt.log.writeln('FAILED ALL VALIDATIONS -> ' + file_name);
					}
				}

				for (var i = 0; i < obj.css.length; i++)
				{
					var file_name = obj.css[i].replace(url, '');

					if (file_name.indexOf('http') === -1)
					{
						if (css_all.indexOf(rootPath + file_name) === -1)
						{
							css_all.push(rootPath + file_name);
						}

						if (file_name.indexOf('/media/system') === -1 && file_name.indexOf('/media/jui') === -1)
						{
							if (css.indexOf(rootPath + file_name) === -1)
							{
								css.push(rootPath + file_name);
							}
						}
					}
				}

				grunt.config.set('assets.css.custom', css);
				grunt.config.set('assets.js.custom', js);
				grunt.config.set('assets.css.all', css_all);
				grunt.config.set('assets.js.all', js_all);

				grunt.log.writeln('CSS Count: ', css.length);
				grunt.log.writeln('JS Count: ', js.length);
				grunt.log.writeln('JS All: ', js_all.length);
				grunt.log.writeln('CSS All: ', css_all.length);

				var assets = {
					js: {
						custom: js,
						all: js_all
					},
					css: {
						custom: css,
						all: css_all
					}
				};

				grunt.file.write('build/assets.json', JSON.stringify(assets), { encoding: 'utf8' });

				done();
			}
		});
	});
};