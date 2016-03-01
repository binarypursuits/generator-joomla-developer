
var prompts = {
	"administrator": require('./administrator')
};

module.exports = function(name) {

	console.log('name -> ' + name);
	
	if (typeof prompts[name] !== "undefined")
	{
		return prompts[name];
	}
	else
	{
		new Error('Attempting to access prompts grouping which does not exist.');
	}
	
};