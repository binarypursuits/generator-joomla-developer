INSERT INTO 
    `<%= database.prefix %>users` 
    (
        `id`, 
        `name`, 
        `username`, 
        `email`, 
        `password`, 
        `block`, 
        `sendEmail`, 
        `registerDate`, 
        `lastvisitDate`, 
        `activation`
    ) 
VALUES
    (
        '<%= administrator.id %>', 
        '<%= administrator.name %>', 
        '<%= administrator.username %>', 
        '<%= administrator.email %>', 
        '<%= administrator.password %>',
        0, 
        0, 
        '2015-07-22 22:09:12', 
        '0000-00-00 00:00:00', 
        ''
    );

INSERT INTO
 `<%= database.prefix %>user_usergroup_map` 
    (
        `user_id`, 
        `group_id`
    )
VALUES
    (
        <%= administrator.id %>, 
        8
    );