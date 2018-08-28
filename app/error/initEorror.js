const util = require('util');

function InitError(){

}

util.inherits(InitError, Error);

module.exports = InitError;