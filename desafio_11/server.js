const Products = require('./src/js/products');
const Messages = require('./src/js/messages');
// const router = require('./src/js/routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const express = require('express');
const moment = require('moment');
const http = require('http');
const { Server } = require('socket.io');
const { engine: handlebars } = require('express-handlebars');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

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
app.use(
    session({
        secret: 'secret',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60,
        },
        store: MongoStore.create({
            mongoUrl:
            'mongodb+srv://coderhouse:coderhouse@cluster0.xihge.mongodb.net/?retryWrites=true&w=majority',
            dbName: 'ecommerce',
            collectionName: 'sessions',
        }),
    })
);
app.use((req, resp, next) => {
    if (req.session.user) {
        resp.locals.user = req.session.user;
    }

    next();
});

const products = new Products();
const messages = new Messages();


// Despliegue messages
app.get('/api/messages', async (req, resp) => {
    const messages = await messages.getAll();

    resp.json(messages)
    })

// Despliegue inicial - Raiz del servidor => http://localhost:8080/
app.get('/', async (req, resp) => {
        if (!req.session.user) {
            return resp.redirect('/login');
        }
        const product = await products.getAll();
        let messages = await messages.getAll();
    
        resp.render('main', { title: 'Desafío 11', product, messages });
});

// Despliegue login
app.get('/login', async (req, resp) => {
    resp.render('login', { title: 'Login' });
});

app.post('/login', async (req, resp) => {
    console.log(req.body);
    if (!req.body.name) {
        return resp.json({
            error: true,
            message: 'Nombre es requerido',
        });
    }

    req.session.user = { name: req.body.name };

    return resp.json({
        redirect: '/',
    });
});

app.get('/logout', async (req, resp) => {
    if (!req.session.user) return resp.redirect('/login');
    const name = req.session.user.name;
    req.session.destroy();
    resp.render('logout', { title: 'Logout', name });
});

// Despliegue products random
app.get('/api/productos-test', async (req, resp) => {
    const product = [1, 2, 3, 4].map((id) => {
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
    console.log("Un cliente se conectado", socket.id);

    // Products
    socket.on('add-product', data => {
        products.addProduct(data);
        io.emit("update-products", products.getAll());
    });

    // Messages
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