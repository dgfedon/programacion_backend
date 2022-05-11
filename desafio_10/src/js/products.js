const { mysql } = require('../../database/config');
const knex = require('knex')(mysql);

class Products {
	// constructor () {
	// 	this.products = [];
	// }

    // // Generar id
	// generateId() {
    //     let id = 1;
    //     const newId = this.products[this.products.length - 1];

    //     // Asignar id al objeto nuevo
    //     if (newId) {
    //         id = newId.id + 1
    //     }

	// 	return id;
	// }

    // Agregar item
	async addProduct(data) {
		try {
			await knex('products').insert({
				name: data.name,
				price: data.price,
				img: data.img,
			});
		} catch (error) {
		console.log(error);
		}
	}

    // Obtener mediante Id
	async getById(id) {
		try {
			const product = await knex('products').where({ id });
			return product;
		} catch (error) {
		console.log(error);
		}
	}

    // Actualizar
	async update(id, data) {
		try {
			return await knex('products').where({ id }).update(
				{
					name: data.name,
					price: data.price,
					img: data.img,
				},
				'*');
		} catch (error) {
		console.log(error);
		}
	}

    // Obtener todo
	async getAll() {
		return await knex('products');
	}

    // Eliminar mediante id
	async deleteById(id) {
        await knex('products').where({ id }).del();
	}
}

module.exports = Products;