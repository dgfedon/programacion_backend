const fs = require('fs');
const express = require('express');
const app = express();

class Container {
    constructor (fileName) {
        this.fileName = fileName;
    }
    getAll() {
        try {
            const data = fs.readFileSync(this.fileName,'utf-8');

            return (data);

        } catch (error) {
            console.log(`Error al obtener lectura ${error}`);
        }
    }
    getRandom() {
        try {
            const data = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            const prodRandom = data[Math.round(Math.random() * (data.length - 1))];

            return (prodRandom);

        } catch (error) {
            console.log(`Error al obtener lectura de productos random ${error}`);
        }
    }
}

// Nombre archivo
const container = new Container('./product.txt');

// Fx conexión con el servidor
function connectedServer() {
    const server = app.listen(8080, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    });
    
    // Si ocurre un error
    server.on("error", error => console.log(`Error en servidor ${error}`));
};
connectedServer();


// Raiz del servidor => http://localhost:8080/
app.get('/', (req, resp) => {
    resp.send('<h1>Despliegue</h1>')
});

// Array todos productos disponible => http://localhost:8080/products
app.get('/products', (req, resp) => {
    const products = container.getAll('./product.txt');
    !products ? 
    (resp.status(404).send('No se encontraron los productos'))
    :
    (resp.send(`<h1>Productos:</h1> ${products}`))
});

// Producto elegido al azar => http://localhost:8080/productrandom
app.get('/productRandom', (req, resp) => {
    const productRandom = JSON.stringify(container.getRandom('./product.txt'));
    !productRandom ? 
    (resp.status(404).send('No se encontro producto random'))
    :
    (resp.send(`<h1>Producto random:</h1> ${productRandom}`))
});