const STATUS = {
    ERROR: 'error',
    SUCCESS: 'success'
}
const UNSET = '--';

function successObject(msg, data) {
    let resObj = responseObject(STATUS.SUCCESS, msg);
    resObj.data = data || {};
    return resObj;
}

function errorObject(msg) {
    return responseObject(STATUS.ERROR, msg)
}

function responseObject(status, msg) {
    return {
        status: status ? status : UNSET,
        msg: msg ? msg : UNSET
    };
}

module.exports = {
    success: (res, msg) => {
        res.status(200).json(successObject(msg));
    },
    successWithData: (res, data) => {
        res.status(200).json(successObject(null, data));
    },
    error: (res, msg) => {
        res.status(400).json(errorObject(msg));
    }
};