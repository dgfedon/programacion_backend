
import { Request, Response, Router } from 'express'
import { fork } from 'node:child_process';
import path from 'node:path';
import { cpus } from 'os';
import passport from 'passport';
import { AuthController, MessageController } from '../controllers';
import { Message, Product } from '../daos';

const router = Router();

router.get('/api/messages', MessageController.getMessages);

router.get('/', async (req: Request, res: Response) => {
   if (!req.user) {
      return res.redirect('/login');
   }

   const productos = await Product.getAll();


   let messages = await Message.getAll();

   res.render('main', { title: 'Productos', productos, messages });
});

router.get('/login', AuthController.renderLogin);

router.get('/register',AuthController.renderRegister);

router.post('/register', AuthController.register)




router.post('/login', passport.authenticate('local', { session: true }), AuthController.login);



router.get('/logout', AuthController.logout);

router.get('/info', async (req, res) => {

   const info = {
      args: process.argv.slice(2),
      os: process.platform,
      node_v: process.version,
      memory: process.memoryUsage().heapUsed,
      path: process.execPath,
      pid: process.pid,
      dir: process.cwd(),
      cpus: cpus().length
   }

   // console.log(info);

   res.render('info', { title: 'Info', info });
})

router.get('/api/random', (req, res) => {

   const amount = parseInt(req.query.cant as string) || 100_000_000

   const forked = fork(path.join(__dirname, './random.js'))

   forked.send({ start: true, amount })


   forked.on('message', (result) => {

      res.json(result)

   })
})


export default router