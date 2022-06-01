class Products {
	constructor () {
		this.products = [];
	}

    // Generar id
	generateId() {
        let id = 1;
        const newId = this.products[this.products.length - 1];

        // Asignar id al objeto nuevo
        if (newId) {
            id = newId.id + 1
        }

		return id;
	}

    // Agregar item
	addProduct(data) {
        // Generar id
		data.id = this.generateId();

        // Agregar
		this.products.push(data);

		return this.products;
	}

    // Obtener mediante Id
	getById(id) {
		return this.products.find(item => item.id === parseInt(id));
	}

    // Actualizar
	update(id, data) {
		let updateData;

		const updateMap = this.products.map(item => {
			if (item.id === parseInt(id)) {
				item = Object.assign(item, data);

				updateData = item;
			}
			return item;
		});

		this.products = updateMap;

		return updateData;
	}

    // Obtener todo
	getAll() {
		return this.products;
	}

    // Eliminar mediante id
	deleteById(id) {
        // Filtrar mediante id
		const filterId = this.products.filter(item => item.id !== parseInt(id));

		this.products = filterId;

		return this.products;
	}
}

module.exports = Products;