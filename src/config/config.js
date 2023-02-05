function config() {
    return {
        CORS: true,
        baseApiURL: 'http://localhost:5100',
        db: {
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'chat',
        }
    }
}

module.exports = config();