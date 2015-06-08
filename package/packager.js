'use-strict'

var packager = (function(){

	var config, type, factory;

	function setType(_type)
	{
		type = _type;
		factory = require('./' + type);
		factory.load(config);
	}

	function loadInformation(info)
	{
		config = info;
		console.log(config);
	}

	function processFiles(copy)
	{
		var files = factory.files(copy);
		async.series(files);
		return true;
	}

	function archiveFiles()
	{

	}

	return {
		load: loadInformation,
		type: setType,
		process: processFiles,
		archive: archiveFiles
	};

})();

module.exports = packager;