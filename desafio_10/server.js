const Products = require('./src/js/products');
const Messages = require('./src/js/messages');
// const router = require('./src/js/routes');
const express = require('express');
const moment = require('moment');
const http = require('http');
const { Server } = require('socket.io');
const { engine: handlebars } = require('express-handlebars');
const { default: faker } = require('@faker-js/faker');
const { normalize, schema } = require('normalizr');



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
// app.get('/', async (req, resp) => {

//     const product = await products.getAll();
//     let messag = await messages.getAll();

//     resp.render('main', { title: 'Mocks y Normalización', product, messag })
// });

const author = new schema.Entity('authors');
const message = new schema.Entity('messages', {
    author: author,
});
const messagesSchema = new schema.Array(message);

app.get('/api/messages', async (req, resp) => {
    const messages = await messages.getAll();

    resp.json(normalize(messages, messagesSchema))
    })

app.get('/', async (req, resp) => {
        const product = await products.getAll();
    
        let messages = await messages.getAll();
    
        resp.render('main', { title: 'Mocks y Normalización', product, messages });
    });

app.get('/api/productos-test', async (req, resp) => {
    const product = [1, 2, 3, 4, 5].map((id) => {
        return {
            id,
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            img: faker.image.image(),
        };
    });

    resp.render('random', { title: 'Productos Random', product });
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
    socket.on("new-message", async (message) => {
        const data = {
            author: {
                id: message.author.id,
                nombre: message.author.nombre,
                apellido: message.author.apellido,
                alias: message.author.alias,
                edad: message.author.edad,
                avatar: message.author.avatar,
                },
                text: message.text,
                date: moment().format("DD/MM/YYYY hh:mm:ss")
            };
        await mensajes.save(data);
        io.emit('message', data);
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