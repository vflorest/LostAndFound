module.exports = {
    app: {
        port: process.env.PORT || 3001
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '0000',
        database: process.env.DB_NAME || 'lost_and_found'
    },
    secretKey: process.env.SECRET_KEY || 'CONC3EujjGzPyqS5ezfBX1u3uQ7/rVO++QwTmSKg7YE='
};
