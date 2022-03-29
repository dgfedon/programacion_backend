const Products = require('./src/js/products');
const Messages = require('./src/js/messages');
// const router = require('./src/js/routes');
const express = require('express');
const moment = require('moment');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine: handlebars } = require('express-handlebars');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const products = new Products();
const messages = new Messages('./src/data/messages.json');

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
app.set('views', './public/views');

// Middleware 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Raiz del servidor => http://localhost:8080/
app.get('/', (req, resp) => {
    resp.render('main', { title: 'Websockets' })
});

// Socket
io.on("connection", async (socket) => {
    console.log("Un cliente se conectado");

    socket.emit("products", products.getAll());
    // Se actualiza tabla
    socket.on('update', data => {
        products.addProduct({...data});
        io.sockets.emit("products", products.getAll());
    });

    // Carga inicial (messages.json)
    socket.emit("messages", await messages.getAll());
    // Se actualiza lista
    socket.on("new-message", async (data) => {
        data.fyh = moment().format('DD/MM/YYYY hh:mm:ss');
        await messages.save(data);
        io.sockets.emit("messages", await messages.getAll());
    });
});

// Fx conexión con el servidor
function connectedServer() {
    const PORT = 8080;

    const server = httpServer.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    });


    // Si ocurre un error
    server.on("error", error => console.log(`Error en el servidor ${error}`));
};
connectedServer();