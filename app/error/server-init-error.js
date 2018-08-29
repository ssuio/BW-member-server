/**
 * Module dependencies.
 */

const util = require('util');
const BWError = require('./bw-error');

/**
 * Constructor
 */

function ServerInitError(msg){
    this.msg = msg;
 }

 util.inherits(ServerInitError, BWError);