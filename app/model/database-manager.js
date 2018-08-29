/**
 * Module dependency
*/

const util = require('util');
const EventEmitter = require('events').EventEmitter; 
const DatabaseError = require('../error/database-error');

/**
 * Constructor
*/

function DatabaseManager(){
    this.connectionList = {};

    EventEmitter.call(this);
}

util.inherits(DatabaseManager, EventEmitter);

DatabaseManager.prototype.connect = function(){
    throw new DatabaseError('connect not implement.');
};

DatabaseManager.prototype.set = function(){
    throw new DatabaseError('set not implement.');
};

DatabaseManager.prototype.get = function(){
    throw new DatabaseError('get not implement.');
};

if(module.id === '.'){
    let mgr = new DatabaseManager({
        host: '127.0.0.1',
        pwd: 'Abcd1234'
    });
    mgr.on('error', function(err){
        console.log('error !!!');
    });
    
}

module.exports = DatabaseManager;