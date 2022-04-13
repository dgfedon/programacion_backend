const Products = require('./src/js/products');
const Messages = require('./src/js/messages');
// const router = require('./src/js/routes');
const express = require('express');
const moment = require('moment');
const http = require('http');
const { Server } = require('socket.io');
const { engine: handlebars } = require('express-handlebars');



const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);


const products = new Products();
const messages = new Messages();

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
app.get('/', async (req, resp) => {

    const product = await products.getAll();
    let messag = await messages.getAll();

    resp.render('main', { title: 'Base de datos', product, messag })
});

// Socket
io.on("connection", async (socket) => {
    console.log("Un cliente se conectado");

    socket.on('add-product', data => {
        products.addProduct(data);
        io.emit("update-products", products.getAll());
    });

    // Carga inicial (messages.json)
    socket.on("messages", await messages.getAll());
    // Se actualiza lista
    socket.on("new-message", async (data) => {
        const message = {
            mail: data.email,
            msg: data.message,
            fyh: moment().format("DD/MM/YYYY hh:mm:ss"),
        };
        await messages.save(message);
        io.emit("messages", message);
    });
});

// Fx conexión con el servidor
function connectedServer() {
    const PORT = process.env.PORT || 8080;

    httpServer.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto  http://localhost:${PORT}`)
    });


    // Si ocurre un error
    httpServer.on("error", error => console.log(`Error en el servidor ${error}`));
};
connectedServer();