const path = require('path');
const express = require('express');
const router = express.Router();
const authenticator = require('../authenticator');

router.get('/', (req, res, next) => {
    console.log('Root access.');
    // console.log(req.session);
    if (req.session.uid === undefined)
        res.sendFile(path.join(__dirname, '..', '/view/login.html'));
    else if (req.session && req.session.uid === 'admin')
        res.sendFile(path.join(__dirname, '..', '/view/admin.html'));
    else if (req.session && req.session.uid === 'user')
        res.sendFile(path.join(__dirname, '..', '/view/user.html'));
});

router.post('/login', (req, res, next) => {
    // console.log(req.session);
    // console.log(req.body);
    // req.session.uid = 'admin';
    console.log('Access login.');
    // console.log(req.body);
    let id = req.body.id;
    let pwd = req.body.pwd;
    let result = authenticator.auth(id, pwd);
    if(result.uid !== undefined){
        req.session.uid = result.uid;
        res.status(200).json({
            'status': 'success'
        });
    }else{
        res.status(401).json({
            msg:result.msg
        });
    }
});

router.post('/logout', (req, res, next) => {
    req.session.uid = undefined;
    res.redirect('/')
});

//Redirect all undefined routes
router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;