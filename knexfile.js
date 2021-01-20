
const path = require('path');
module.exports = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        database: 'job_vacancy',
        user: 'root',
        password: ''
    },

    migrations: {
        tableName: 'migrations',
        directory: path.resolve(__dirname, './migrations'),
    },
    userNullAsDefault: true

};