const dotenv = require('dotenv')

function backend() {
    dotenv.config({ path: ".env" })
    return {
        CORS: true,
        baseApiURL: 'http://localhost:5100',
        jwtSecret: `${process.env.JWT_SECRET}`,
        frontendURL: `${process.env.FRONTEND_URL}`,
        db: {
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'chat',
            serviseRoleKey: `${process.env.SERVICE_ROLE_KEY}`,
            supabaseUrl: 'http://localhost:8100'
        }
    }
}

module.exports = backend();