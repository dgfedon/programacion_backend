module.exports = {
    mysql: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'ecommerce',
        },
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: './messages.sqlite',
        },
        useNullAsDefault: true,
        },
};