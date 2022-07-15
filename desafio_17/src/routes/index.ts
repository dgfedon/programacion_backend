import { Request, Response, Router } from 'express';
import { fork } from 'node:child_process';
import path from 'node:path';
import { cpus } from 'os';
import passport from 'passport';
import { AuthController, MessageController } from '../controllers';
import { Message, Product } from '../daos';
import { authRouter } from './auth.routes';
import { mainRouter } from './main.routes';
import { messageRouter } from './messages.routes';

const router = Router();

router.use(messageRouter);
router.use(authRouter);
router.use(mainRouter);

router.get('/api/random', (req, res) => {
  const amount = parseInt(req.query.cant as string) || 100_000_000;

  const forked = fork(path.join(__dirname, '../forks/random.js'));

  forked.send({ start: true, amount });

  forked.on('message', (result) => {
    return res.json(result);
  });
});

export { router };
