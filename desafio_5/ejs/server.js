const express = require('express');
const app = express();

const router = require('./routes')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración ejs
app.set('view engine', 'ejs');

// Raiz del servidor => http://localhost:8080/
app.get('/', (req, resp) => {
    resp.render('pages/index', { title: 'Formulario' });
});

// Url base => http://localhost:8080/productos
app.use('/productos', router);

// Fx conexión con el servidor
function connectedServer() {
    const server = app.listen(8080, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    });
    
    // Si ocurre un error
    server.on("error", error => console.log(`Error en el servidor ${error}`));
};
connectedServer();