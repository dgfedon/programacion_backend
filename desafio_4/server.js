const express = require('express');
const app = express();

const router = require('./routes')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Raiz del servidor => http://localhost:8080/
app.get('/', (req, resp) => {
    resp.send('index.html')
});

// Url base => http://localhost:8080/api/productos
app.use('/api/productos', router);

// Fx conexión con el servidor
function connectedServer() {
    const server = app.listen(8080, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    });
    
    // Si ocurre un error
    server.on("error", error => console.log(`Error en el servidor ${error}`));
};
connectedServer();