var config = require('./app-config');
var path = require('path');
var fs = require('fs');
var http = require('http');
var https = require('https');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');
var session = require('./session');
var cors = require('cors')
var cookieParser = require('cookie-parser');
const http_port = 8888;
const https_port = 8889;

var app = express();

//Setup router
// app.use(cors());
app.use(cookieParser());
app.use(session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Setup api
app.use('/', routes);

//create http/https server
let httpServer = http.createServer(app);
let sslConfig = {
    key: fs.readFileSync(path.join(__dirname, './cert/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './cert/cert.pem'))
};
let httpsServer = https.createServer(sslConfig, app);

//Setup http/https server
initWebServer(httpServer, http_port);
initWebServer(httpsServer, https_port);
function initWebServer(webServer, port) {
    function onError(){
        process.exit(1);
    }
    webServer.on('error', onError);
    webServer.listen(port, 'localhost');
}

module.exports = app;