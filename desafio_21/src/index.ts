import dotenv from 'dotenv';
import minimist from 'minimist';
import http from 'http';
import { Server } from 'socket.io';
import { createApp } from './config/express';
import { connectDb } from './config/db';
import cluster from 'cluster';
import { cpus } from 'os';
import { DaoFactory, Message, Product } from './daos';
import './middlewares/passport';


dotenv.config();

const totalCPUs = cpus().length;

const args = minimist(process.argv.slice(2));

const PORT = args.port || 3001;

const main = async () => {
  await connectDb();
  console.log(`Worker ${process.pid} started`);

  const app = createApp();
  const server = http.createServer(app);
  const io = new Server(server);

  const productDao = DaoFactory.getDao('product', 'mongo');
  const productDao2 = DaoFactory.getDao('product', 'mongo');
  const messageDao = DaoFactory.getDao('message', 'mongo');

  console.log(productDao.uid === productDao2.uid);

  io.on('connection', (socket) => {
    console.log('New conection', socket.id);

    socket.on('disconnect', () => {
      console.log(socket.id, 'disconnected');
    });

    socket.on('add-product', async (product) => {
      await productDao.create(product);

      io.emit('update-products', product);
    });

    socket.on('message', async (message) => {
      const data = {
        author: {
          id: message.author.id,
          name: message.author.nombre,
          lastname: message.author.apellido,
          alias: message.author.alias,
          age: message.author.edad,
          avatar: message.author.avatar,
        },
        text: message.text,
        date: new Date(),
      };

      await messageDao.create(data);

      io.emit('message', data);
    });
  });

  server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
  });

  server.on('error', (err) => {
    console.log(`Algo salio mal: ${err}`);
  });
};

const MODE = args.mode || 'FORK';

if (MODE === 'CLUSTER') {
  if (cluster.isPrimary) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      cluster.fork();
    });
  } else {
    main().catch((err) => console.log(err));
  }
} else {
  main().catch((err) => console.log(err));
}
