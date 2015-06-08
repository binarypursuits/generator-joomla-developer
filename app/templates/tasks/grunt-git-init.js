'use-strict';

module.exports = function(grunt) {

	function initiliazeGitRepository()
	{
		exec('git init', { cwd: grunt.config.get('repository.path') }, function(err, stdout, stderr) {

			if (err)
			{
				throw err;
			}

		});;
	}

	function addRemoteOrigin()
	{
		exec('git remote add origin ' + grunt.config.get('repository.url'), { cwd: grunt.config.get('repository.path') }, function(err, stdout, stderr) {

			if (err)
			{
				throw err;
			}
		});

	}

	function commitReadMe()
	{
		exec('git commit -m "Initial commit with README.md"', { cwd: grunt.config.get('repository.path') }, function(err, stdout, stderr) {

			if (err)
			{
				throw err;
			}
		});

	}

	function pushReadMe()
	{
		exec('git push -u origin master', { cwd: grunt.config.get('repository.path') }, function(err, stdout, stderr) {

			if (err)
			{
				throw err;
			}
		});

	}

	function pushCodeBase()
	{
		exec('git push --all', { cwd: grunt.config.get('repository.path') }, function(err, stdout, stderr) {

			if (err)
			{
				throw err;
			}
		});

	}

	grunt.registerTask('grunt-git-init', 'Initialize new repository', function() {

		async.series([
			initializeGitRepository(),
			addRemoteOrigin(),
			commitReadMe(),
			pushReadMe(),
			pushCodeBase()
		]);

	});

};
