const path = require('path');
const dbService = require('../model/db-service');
const responseHelper = require('./response-helper');
const authenticator = require('../authenticator');

function base(req, res) {
    if (req.session.uid === undefined)
        res.sendFile(path.join(__dirname, '..', '/view/login.html'));
    else if (req.session && req.session.uid === 'admin')
        res.sendFile(path.join(__dirname, '..', '/view/admin.html'));
    else if (req.session && req.session.uid === 'user')
        res.sendFile(path.join(__dirname, '..', '/view/user.html'));
}

function register(req, res) {
    let userInfo = {
        email: req.body.email,
        pwd: req.body.pwd,

    };
    if (!usserInfo.email)
        return responseHelper(res, 'email not found.')
    else if (!usserInfo.pwd)
        return responseHelper(res, 'pwd not found.')

    dbService.addUser(userInfo)
        .then(() => {
            responseHelper.success(res);
        })
        .catch(err => {
            responseHelper.error(res, err);
        });
}

function login(req, res) {
    console.log('Access login.');
    let id = req.body.id;
    let pwd = req.body.pwd;
    let result = authenticator.auth(id, pwd);
    if (result.uid !== undefined) {
        req.session.uid = result.uid;
        responseHelper.success(res);
    } else {
        responseHelper.error(res, 'login failed.');
    }
}

function logout(req, res) {
    req.session.uid = undefined;
    res.redirect('/');
}

module.exports = {
    base,
    register,
    login,
    logout
};