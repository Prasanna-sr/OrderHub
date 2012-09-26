var express = require('express');
var host = "localhost";
var port = "3000";

var app = module.exports = express.createServer();

var expressConfig = require('./lib/express_config');
expressConfig.configure(app);

var routes  = require('./lib/routes');
routes(app);

var sioLib = require("./lib/socketio");
sioLib(app);

app.listen(port, host);

console.log("app is running at -  " + host + ":" + port);