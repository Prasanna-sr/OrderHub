var dbUtil = require('./cloudFoundryUtil');

var conn;
var db;
module.exports = {
    connect: function(dbServiceName) {
        db = dbUtil.connect('mongodb', dbServiceName);
        db.open(function(err, connection) {
            if (err || !connection) {
                console.log('Could not connect to MongoDB');
            } else {
                console.log('Connected to MongoDB successfully');
                conn = connection;
            }
        });
    },
     //function for login page
    getUserInfo : function(email, callback) {
        db.collection('userdetails');
        db.bind('userdetails');
        db.userdetails.findOne({"contact_info.email" : email}, function(err, document) {
            if(err) {
                callback(err);
            } else {
                callback(null, document);
            }
        });

    },
       	
 }