var session = require('express-session');
var FileStore = require('session-file-store')(session);
const serversession = session({
    secret: 'BW',
    resave: true,
    saveUninitialized: false,
    // store: new FileStore({
    //     ttl: 30*60
    // }),
    cookie: {
        maxAge: 30*60*1000
    }
});

module.exports = serversession;