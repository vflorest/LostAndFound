module.exports = {
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'lost_and_found'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret'
    },
    app: {
        port: process.env.APP_PORT || 3001
    }
};
