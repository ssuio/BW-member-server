const dbService = require('../model/db-service');
const responseHelper = require('./response-helper');
const { UserNotFound } = require('../code');

function get(req, res) {
    console.log('get user');
    let id = req.query.id;
    dbService.getUser(id)
        .then(data => {
            if (!data) {
                responseHelper.error(res, UserNotFound);
            } else {
                responseHelper.successWithData(res, data)
            }
        }).catch(err => {
            responseHelper.error(res);
        });
};

module.exports = {
    get
};