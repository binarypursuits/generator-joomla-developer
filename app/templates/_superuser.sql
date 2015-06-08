INSERT INTO
	`<%= prefix %>_users`
SET
	id=<%= fields.id %>,
	name='<%= fields.name %>',
	username='<%= fields.username %>',
	email='<%= fields.email %>',
	password='<%= fields.password %>',
	block=<%= fields.block %>,
	sendEmail=<%= fields.sendEmail %>,
	registerDate='<%= fields.registerDate %>',
	lastvisitDate='<%= fields.lastvisitDate %>',
	activation='<%= fields.activation %>',
	params='<%= fields.params %>',
	lastResetTime='<%= fields.lastResetTime %>',
	resetCount=<%= fields.resetCount %>,
	otpKey='<%= fields.otpKey %>',
	otep='<%= fields.otep %>',
	requireReset=<%= fields.requireReset %>;

UPDATE
	`<%= prefix %>_user_usergroup_map`
SET
	group_id=8
WHERE
	user_id=<%= fields.id %>;