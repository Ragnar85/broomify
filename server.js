var http = require('http');
var request = require('request');
var express = require('express');
var app = express();
var _ = require('underscore');
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
routes(app); // attach all routes


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

process.argv.forEach(function(val, index, array) {
    if (val.indexOf('=') !== -1) {
        var arg = val.split("=");
        process.env[arg[0]] = arg[1];
    }
});

var proxyServer = +process.env['-from'] || +process.env['NODE_PORT'] || 8888;

http.createServer(app).listen(proxyServer, function(){
	console.log('Proxyserver started at ' + proxyServer);
});
