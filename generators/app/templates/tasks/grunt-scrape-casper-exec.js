'use-strict';

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
        var images = grunt.config.get('assets.images');
        var media = grunt.config.get('assets.media');
        var unknown = grunt.config.get('assets.unknown');

		var rootPath = grunt.config.get('repository.path') + '/' + grunt.config.get('repository.joomla');

        grunt.log.writeln('Link -> ' + link);
        grunt.log.writeln('Root Path -> ' + rootPath);

		exec('casperjs scrape.js --url=' + base.encode(link) + ' --web-security=false', { cwd: grunt.config.get('repository.path') + "/tasks/scripts" }, function (error, stdout, stderr) {

			if (error)
			{
				throw error;
			}
			else
			{
                grunt.log.writeln('Scraped Endpoint!');
                
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

						if (file_name.indexOf('/media/system') === -1 && file_name.indexOf('/media/jui') === -1 && file_name.indexOf('modernizr') === -1 && file_name.indexOf('libs') === -1 && file_name.indexOf('capture.js') === -1)
						{
							if (js.indexOf(rootPath + file_name) === -1)
							{
								js.push(rootPath + file_name);
							}
						}
					}
					else
					{
						grunt.log.writeln('Externally Hosted Resrouce -> ' + file_name);
					}
				}

				for (i = 0; i < obj.css.length; i++)
				{
					var file_name = obj.css[i].replace(url, '');

					if (file_name.indexOf('http') === -1)
					{
						if (css_all.indexOf(rootPath + file_name) === -1)
						{
							css_all.push(rootPath + file_name);
						}

						if (file_name.indexOf('/media/system') === -1 && file_name.indexOf('/media/jui') === -1 && file_name.indexOf('libs') === -1)
						{
							if (css.indexOf(rootPath + file_name) === -1)
							{
								css.push(rootPath + file_name);
							}
						}
					}
				}
                
                /*
                var image_count = 0;
                var media_count = 0;
                var unknown_count = 0;
                
                for(i = 0; i < obj.images.length; i++)
                {
                    grunt.log.writeln('Image File ' + obj.images[i]);
                    var name;
 
                    if (obj.images[i].indexOf('/images') === 0)
                    {
                        name = obj.images[i].replace('/images','');
                        images.push(name);    
                        image_count++;
                    }
                    else if (obj.images[i].indexOf('/media') === 0)
                    {                      
                        var media_object = {
                            expand: true,
                            cwd: './<%= repository.name %>/media',
                            src: obj.images[i].replace('/media',''),
                            dest: 'media/'
                        };
                        media.push(media_object);    
                        media_count++;                            
                    }
                    else
                    {
                        unknown.push(obj.images[i]);
                        unknown_count++;
                    }
                }
 
 */

				grunt.config.set('assets.css.custom', css);
				grunt.config.set('assets.js.custom', js);
				grunt.config.set('assets.css.all', css_all);
				grunt.config.set('assets.js.all', js_all);
                /*grunt.config.set('assets.images', images);
                grunt.config.set('assets.media', media);
                grunt.config.set('assets.unknown', unknown);*/

				grunt.log.writeln('CSS Count: ', css.length);
				grunt.log.writeln('JS Count: ', js.length);
				grunt.log.writeln('JS All: ', js_all.length);
				grunt.log.writeln('CSS All: ', css_all.length);
                /*grunt.log.writeln('Images Count: ', image_count);
                grunt.log.writeln('Media Count: ', media_count);
                grunt.log.writeln('Unknown Count: ', unknown.count);*/

				var assets = {
					js: {
						custom: js,
						all: js_all
					},
					css: {
						custom: css,
						all: css_all
					}/*,
                    images: images,
                    media: media,
                    unknown: unknown*/
				};

				grunt.file.write('build/assets.json', JSON.stringify(assets), { encoding: 'utf8' });

				done();
			}
		});
        
	});
};
