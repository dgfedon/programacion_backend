import { Router, Request, Response } from 'express';
import { MainController } from '../controllers/MainController';

const mainRouter = Router({});

mainRouter.get('/', MainController.renderMainPage);

mainRouter.get('/info', MainController.renderServerInfoPage);

export { mainRouter };
