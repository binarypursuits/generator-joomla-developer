var folderContents = require('folder-contents');

var options = {
    "path":"./public/configurations",
    "separator":".",
    "recursively":true,
    "method":"simplePath",
    "useBasePath":true,
    "filter":{
        "extensionIgnore":[],
        "extensionAccept":[],
        "folderIgnore":[],
        "fileIgnore":[]
    },
    "date":true, // See doc for patterns and i18n
    "size":true, // See doc for patterns and i18n
    "useFullPath":false
};
var jsonResult = folderContents(options);

console.log(jsonResult);