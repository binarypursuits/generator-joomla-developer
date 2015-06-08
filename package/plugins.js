'use-strict'

var async = require('async');

var plugins = (function() {


	var info;
	var copyMethod;
	var filesArray = [];

	function addFileToArray(source, destination)
	{
		filesArray.push(copyMethod(source, destination));
	}

	function loadInformation(_info)
	{
		info = _info;
	}

	function getFilesArray(copy)
	{
		copyMethod = copy;

	}

	return {
		load: loadInformation,
		files: getFilesArray
	}

})();

module.exports = plugins;