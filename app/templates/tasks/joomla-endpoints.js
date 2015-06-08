'use-strict'

module.exports = function(grunt) {

	grunt.registerTask('joomla-endpoints', 'Retrieving Joomla instance menu endpoints...', function() {
		var done = this.async();
		var mysql = require('mysql');
		var db = mysql.createConnection(grunt.config.get('database.options'));

		db.connect();

		db.query('SELECT alias, link FROM `' + grunt.config.get('database.prefix') + 'menu` WHERE (published=1 OR published=0) AND (menutype != "menu" AND menutype != "main") AND alias!="root"', function(err, rows, fields) {

			if (err)
			{
				throw err;
			}

			var results = [];
			var tests = [];
			var length = rows.length;

			grunt.log.writeln('Found a total of ' + length + ' enpoints to parse...')

			for (var i = 0; i < length; i ++)
			{
				if (rows[i].link.indexOf('http') === -1 && rows[i].link.indexOf('#') === -1)
				{
					var pos = rows[i].link.indexOf('&id');
					if (pos !== -1)
					{
						var test = rows[i].link.substring(0, pos);
						if (tests.indexOf(test) === -1)
						{
							tests.push(test);
							results.push(rows[i].link);
						}
					}
					else
					{
						if (rows[i].link == "undefined" || rows[i].link == "index.php?Itemid=")
						{
							rows[i].link = "index.php";
						}

						if (results.indexOf(rows[i].link) === -1 && rows[i].link.length !== 0)
						{
							results.push(rows[i].link);
						}
					}
				}
			}

			grunt.config.set('endpoints', results);
			grunt.log.writeln('Found ' + results.length + ' unique menu endpoints to process.');

			done();
		});

	});

};