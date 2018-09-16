/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/* global describe it */

const assert = require('chai').assert;
const dao = require('../model/redis-dao');

describe('model/redis-dao - add user', function () {
    let resultParser;
    it('Add user 001', (done) => {
        dao.addUser({
            email: '001@gmail.com',
            name: '001name',
            pwd: '001pwd'
        }).then(res => {
            assert.equal('OK', res);
            done();
        });
    });
    it('Get user 001', (done) => {
        dao.getUser('user:1').then(data => {
            assert.deepEqual({
                email: '001@gmail.com',
                name: '001name',
                pwd: '001pwd'
            }, data);
            done();
        });
    });
});