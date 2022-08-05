import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers';

const authRouter = Router({});

authRouter.get('/login', AuthController.renderLogin);

authRouter.get('/register', AuthController.renderRegister);

authRouter.post('/register', AuthController.register);

authRouter.post('/login', passport.authenticate('local', { session: true }), AuthController.login);

authRouter.get('/logout', AuthController.logout);


export { authRouter }
