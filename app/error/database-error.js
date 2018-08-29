'use strict';

/**
 * Module dependencies.
 */

const util = require('util');
const BWError = require('./bw-error');

function DatabaseError(msg){
    this.msg = msg;
 }

 util.inherits(DatabaseError, BWError);

 module.exports = DatabaseError;