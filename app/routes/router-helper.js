const authenticator = require('../authenticator');

function checkLogin(req) {
    return req.session.uid !== undefined;
}

function checkLoginAndRedirect() {
    return (req, res, next) => {
        if (checkLogin(req)) {
            next();
        } else {
            res.redirect('/');
        }
    };
}

function checkPermission(){
    return (req, res, next) => {
        if (checkLogin(req)) {
            next();
        } else {
            res.redirect('/');
        }
    };
}

module.exports = {
    checkLoginAndRedirect,
    checkLoginAndRedirectLogin: () => {
        return checkLoginAndRedirect();
    },
    checkPermission
};