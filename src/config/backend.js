const dotenv = require('dotenv')

function backend() {
    dotenv.config({ path: ".env" })
    return {
        CORS: true,
        baseApiURL: 'https://support-chat-api.vsquad.ru',
        jwtSecret: `${process.env.JWT_SECRET}`,
        frontendURL: `${process.env.FRONTEND_URL}`,
        db: {
            host: '95.140.146.164',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'chat',
            serviseRoleKey: `${process.env.SERVICE_ROLE_KEY}`,
            supabaseUrl: 'http://95.140.146.164:8100'
        }
    }
}

module.exports = backend();