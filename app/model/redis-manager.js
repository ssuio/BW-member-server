/**
 * Module dependency
*/

const util = require('util');
const {promisify} = require('util');
const bluebird = require('bluebird');
const redis = require('redis');
bluebird.promisifyAll(redis);
const DatabaseManager = require('./database-manager');
const DatabaseError = require('../error/database-error');

/**
 * Constructor
*/

function RedisManager(options){
    options = options || {};

    if(!options.host){
        throw new DatabaseError('Missing parameter: `host`')
    }

    if(!options.pwd){
        throw new DatabaseError('Missing parameter: `pwd`')
    }

    this.host = options.host;
    this.pwd = options.pwd;

    DatabaseManager.call(this);
}

util.inherits(RedisManager, DatabaseManager);

RedisManager.prototype.connect = function(sessionID){
    let self = this;
    let client = redis.createClient({
        host: this.host,
        password: this.pwd,
        port: 6379
    });

    client.on("connect", function () {
        self.emit('connect');
    });

    client.on("error", function (err) {
        self.emit('error');
    });

    console.log({
        host: this.host,
        password: this.pwd
    });
    this.connectionList[sessionID] = client;
}

RedisManager.prototype.set = function(sessionID, key, value){
    let conn = this.connectionList[sessionID];
    return conn.setAsync(key, value);
}

RedisManager.prototype.get = function(sessionID, key){
    let conn = this.connectionList[sessionID];
    return conn.getAsync(key);
}

if(module.id === '.'){
    let mgr = new RedisManager({
        host: '127.0.0.1',
        pwd: 'Abcd1234'
    });

    mgr.on('connect', function(err){
        console.log('connected !!!');
    });

    mgr.on('error', function(err){
        console.log('error !!!');
    });

    setAndGet(mgr)
        .then(data=>{
            console.log('data');
            console.log(data);
        })
        .catch(err=>{
            console.log('err')
            console.log(err)
        });
}

async function setAndGet(conn){
    try{
        await conn.connect('123');
    }catch(e){
        console.log('catch');
        console.log(e);
    }

    var setRes = await conn.set('123', 'xssuio@gmail.com', 'Mike');
    console.log('set');
    console.log(setRes);

    var getRes = await conn.get('123', 'xssuio@gmail.com');
    console.log('get');
    console.log(getRes);

    return getRes;
}

module.exports = RedisManager;
