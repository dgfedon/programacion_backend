const express = require('express');
const app = express();

const { engine: handlebars } = require('express-handlebars');

const router = require('./routes')

// Configuración handlebars
app.engine(
    "hbs",
    handlebars({
        extname: 'hbs',
        defaultLayout: 'index.hbs',
        // layoutsDir: __dirname + '/views/layouts',
		// partialsDir: __dirname + '/views/partials/'
    })
);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Raiz del servidor => http://localhost:8080/
app.get('/', (req, resp) => {
    resp.render('main', { title: 'Formulario' });
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