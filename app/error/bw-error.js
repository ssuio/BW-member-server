/**
 * Module dependencies.
 */

const util = require('util');

/**
 * Constructor
 */

 function BWError(msg){
    this.msg = msg;
 }

 util.inherits(BWError, Error);

 module.exports = BWError;

 