// Inspired by:
// https://github.com/markgardner/node-flywaydb/blob/HEAD/sample/config.js

const backend = require('../../config/backend.js')

module.exports = function() {
    let url = `jdbc:postgresql://${backend.db.host}:${backend.db.port}/${backend.db.database}`
    let password = backend.db.password
    if (process.platform === 'win32') {
        url =`"${url}"`
        password = `"${password}"`
    }
    return {
        flywayArgs: {
            url,
            schemas: 'public',
            locations: 'filesystem:src/backend/db/migration',
            user: backend.db.user,
            password,
            sqlMigrationSuffixes: '.sql',
            baselineVersion: '0.0',
            baselineDescription: 'init',
            baselineOnMigrate: true
        },
        version: '8.5.10',
        downloads: {
            storageDirectory: 'flyway',
            expirationTimeInMs: -1
        }
    }
}