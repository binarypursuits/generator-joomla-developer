'use strict';

var months = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];

var date = new Date();

var created = function() {
    return months[date.getMonth()] + ' ' + date.getFullYear();
};

exports.created = created;