function auth(id, pwd) {
    if (id === 'admin' && pwd === 'admin') {
        return {
            uid: 'admin',
            msg: 'Success'
        };
    } else if (id === 'user' && pwd === 'user') {
        return {
            uid: 'user',
            msg: 'Success'
        }
    } else {
        return {
            msg: 'Invalid account/pwd.'
        }
    }
}

module.exports = {
    auth
};