module.exports = {
    development:{
        client: 'pg',
        connection: 'postgre://localhost/zonebooks'
    },
    production:{
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
}