const { sqlite } = require('../../database/config');
const knex = require('knex')(sqlite);

class Messages {
    // constructor (fileName) {
    //     this.fileName = fileName;
    // }

    // Guardar
    async save(data) {
        try {
            await knex('messages').insert({
                mail: data.mail,
                msg: data.msg,
                fyh: data.fyh,
            });
        } catch (error) {
        console.log(error);
        }
    }

    // Obtener mediante id
    async getById(id) {
        try {
            const message = await knex('messages').where({ id });
            return message;
        } catch (error) {
        console.log(error);
        }
    }

    // Obtener todo
    async getAll() {
        try {
            const data = await knex('messages');
            return data;
        } catch (error) {
        console.log(error);
        }
    }

    // Borrar mediante id
    async deleteById(id) {
        try {
            await knex('messages').where({ id }).del();
        } catch (error) {
            console.log(`Error al eliminar por id ${error}`);
        }
    }

    // Borrar todo
    async deleteAll() {
        try {
            await knex('messages').del();
        } catch (error) {
        console.log(error);
        }
    }
}

module.exports = Messages;