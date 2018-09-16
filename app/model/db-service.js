const dbConfig = require('../config').database;
const DatabaseError = require('../error/database-error');
let service;

if(dbConfig.type == 'redis'){
    service = require('./redis-dao');
}else if(dbConfig.type == 'postgre'){

}else{
    throw new DatabaseError('Invalid database type.');
}
module.exports = service;