import { Router } from 'express';
import { MessageController } from '../controllers';

const messageRouter = Router();

messageRouter.get('/api/messages', MessageController.getMessages);

export { messageRouter };
