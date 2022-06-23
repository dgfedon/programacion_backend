import { Request, Response } from "express";
import { Message, Product, User } from "../daos";

export class MessageController {

   static async getMessages(req: Request, res: Response) {
      const messages = await Message.getAll();

      res.json(messages);
   }

  
}