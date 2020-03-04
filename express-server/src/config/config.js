module.exports = {
    port: process.env.PORT || 3000,
    db:{
        database: process.env.DB_NAME || 'blackbox',
        user: process.env.DB_USER || 'blackbox',
        password: process.env.DB_PASS || 'blackbox',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './blackbox.sqlite'
        }
     },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    },
}