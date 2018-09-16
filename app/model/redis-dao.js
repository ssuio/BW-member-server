const dbConfig = require('../config').database;
const DatabaseError = require('../error/database-error');
const bluebird = require('bluebird');
const redis = require('redis');
bluebird.promisifyAll(redis);

function getClient() {
    let client = redis.createClient({
        host: dbConfig.host,
        password: dbConfig.pwd,
        port: dbConfig.port
    });
    return new Promise((resolve, reject) => {
        let retry = 0;
        client.on('error', err => {
            console.log('error!!!!!');
            client.quit();
            reject(new DatabaseError(err.code));
        });
        client.on('ready', () => {
            resolve(client);
        });
    });
}

async function generateUserId(client) {
    if (client) {
        client = client || (await getClient());
        let userId = await client.incrAsync('id:user');
        return 'user:' + userId;
    } else {
        client = await getClient();
        try {
            let userId = await client.incrAsync('id:user');
            return 'user:' + userId;
        } finally {
            client.quit();
        }
    }
}

async function showUsers() {
    let client = await getClient();
    try {
        let res = await client.keysAsync('user:*');
        return res;
    } finally {
        client.quit();
    }
}

async function addUser(user) {
    let client = await getClient();
    try {
        let userId = await generateUserId(client);
        let res = await client.hmsetAsync(userId, user);
        return res;
    } finally {
        client.quit();
    }
}

async function getUser(id) {
    let client = await getClient();
    try {
        let res = await client.hgetallAsync('user:' + id);
        return res;
    } finally {
        client.quit();
    }
}

async function deleteUser(id) {
    let client = await getClient();
    try {
        let res = await client.delAsync('user:' + id);
        return res;
    } finally {
        client.quit();
    }
}

const dao = {
    addUser,
    getUser,
    showUsers,
    deleteUser
};

module.exports = dao;

if (module.id === '.') {
    const user1 = {
        name: 'Mike',
        age: 18,
        email: 'xssuio@gmail.com',
        phone: '12345678'
    };

    (async () => {
        try {
            // data = await dao.getUser('1');
            // data = await dao.addUser(user1);
            // data = await dao.showUsers();
            data = await dao.deleteUser('2');
            console.log(data);
        } catch (err) {
            console.log(err)
        }
    })()
}