class Container {
	products = [
		{
            "name": "Barra de Led",
            "price": 500,
            "img": "https://res.cloudinary.com/datafordgf/image/upload/v1639344547/proyecto_led_store/luces_led_bg_v34g7c.jpg",
            "id": 1
        },
        {
            "name": "Tira de Led",
            "price": 300,
            "img": "https://res.cloudinary.com/datafordgf/image/upload/v1639344547/proyecto_led_store/bg_pink_ujveyj.jpg",
            "id": 2
        },
        {
            "name": "Cartel Luminoso",
            "price": 800,
            "img": "https://res.cloudinary.com/datafordgf/image/upload/v1639344547/proyecto_led_store/frase_led_bg_ckhcpw.jpg",
            "id": 3
        }
	];

    // Generar id
	generateId() {
        let id = 1;
        const prodId = this.products[this.products.length - 1];

        // Asignar id al objeto nuevo
        if (prodId) {
            id = prodId.id + 1
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

    // Actualizar products.json
	update(id, data) {
		let updateProd;

		const updateMap = this.products.map(item => {
			if (item.id === parseInt(id)) {
				item = Object.assign(item, data);

				updateProd = item;
			}
			return item;
		});

		this.products = updateMap;

		return updateProd;
	}

    // Obtener todo
	getAll() {
		return this.products;
	}

    // Eliminar mediante id
	deleteById(id) {
        // Filtrar mediante id
		const productId = this.products.filter(item => item.id !== parseInt(id));

		this.products = productId;

		return this.products;
	}
}

module.exports = Container;