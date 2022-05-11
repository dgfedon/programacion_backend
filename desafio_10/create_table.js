const { mysql, sqlite } = require('./database/config');

const knexSQL = require('knex')(mysql);
const knexSQLite = require('knex')(sqlite);

knexSQL.schema
    .hasTable('products')
    .then((exists) => {
        if (exists) return;
        return knexSQL.schema.createTable('products', table => {
        table.increments();
        table.string('name').notNullable();
        table.integer('price').notNullable();
        table.string('img').notNullable();
        });
    })
    .catch(error => console.log(error));

knexSQLite.schema
    .hasTable('messages')
    .then((exists) => {
        if (exists) return;
        return knexSQLite.schema.createTable('messages', table => {
        table.increments();
        table.string('mail');
        table.string('msg');
        table.string('fyh');
        });
    })
    .catch(error => console.log(error));