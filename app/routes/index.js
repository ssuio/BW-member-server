const path = require('path');
const express = require('express');
const router = express.Router();
const { checkPermission } = require('./router-helper')
const generalApi = require('./general');
const userApi = require('./user');

/**
 * General api
*/

router.get('/', generalApi.base);
router.post('/register', generalApi.register);
router.post('/login', generalApi.login);
router.post('/logout', generalApi.logout);

/**
 * User api
*/

router.get('/user/get', checkPermission(), userApi.get);

/**
 * Redirect to login from unrecongnize routes
*/

router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;