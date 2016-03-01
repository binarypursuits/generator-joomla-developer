module.exports = function() {
	
	return [
		{
			type: "input",
			name: "name",
			message: "Enter administrator\'s name for this Joomla instance:",
			"default": "Webmaster"
		},
		{
			type: "input",
			name: "username",
			message: "Enter administrator\'s username for this Joomla instance:",
			"default": "webmaster"
		},
		{
			type: "input",
			name: "email",
			message: "Enter administrator\'s email for this Joomla instance:",
			store: true
		},
		{
			type: "password",
			name: "password",
			message: "Enter administrator\'s password for this Joomla instance:",
			"default": "webmaster"
		}
	];
};