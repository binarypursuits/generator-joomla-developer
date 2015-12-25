'use-strict';

var mysql = require('mysql');

var database = (function(){

    var db;
        
    function createConnection(options) {
        db = mysql.createConnection({
            host: options.host,
            user: options.username,
            password: options.password,
            database: options.database
        });
    }
    
    function executeQuery(query, callback)
    {
        db.query(query, callback);
    }
    
    function closeConnection()
    {    
        db.end();
    }

    return {
        create: createConnection,
        query: executeQuery,
        close: closeConnection
    };
    
}());