const { Router } = require('express');
const router = Router();

const Container = require('./container');
const products = new Container();

// Devuelve todos los productos
router.get('/', (req, resp) => {
	const data = products.getAll();

	resp.render('pages/table', { title: 'Productos', data });
});

// Devuelve un producto según su id
router.get('/:id', (req, resp) => {
	const { id } = req.params;

	const product = products.getById(id);

	if (!product) {
		return resp.json({ error : 'Producto no encontrado' });
	}

	resp.json(product);
});

// Recibe y agrega un producto, y lo devuelve con su id asignado
router.post('/', (req, resp) => {
	const { name, price, img } = req.body;

	products.addProduct({
		name,
		price,
		img,
	});

	resp.redirect('/');
});

// Recibe y actualiza un producto según su id
router.put('/:id', (req, resp) => {
	const { id } = req.params;
	const { name, price, img } = req.body;

	const product = products.update(id, {
		name,
		price,
		img,
	});

	resp.json(product);
});

// Elimina un producto según su id
router.delete('/:id', (req, resp) => {
	const { id } = req.params;

	const product = products.deleteById(id);

	resp.json(product);
});

module.exports = router;