"use-strict";

var process = require("process");

module.exports = function(grunt) {

    grunt.registerTask("set-environmental-variables", "Set appropriate environmental variables for instance.", function(instance) {
        
        var azure = grunt.config.get("arc.azure");
        
        if (typeof azure[instance] !== "undefined")
        {
            process.env["AZURE_STORAGE_ACCOUNT"] = azure[instance].account_name;
            process.env["AZURE_STORAGE_ACCESS_KEY"] = azure[instance].account_key;
        }
        else
        {
            grunt.log.error("Unrecognized Instance Name, Account Name and Key values not found in azure.json configuration file.");
        }

	});

};