import { NextFunction, Request, Response } from "express";



export async function sessionToLocals(req: Request, res: Response, next: NextFunction) {
   if (req.user) {
      res.locals.user = req.user;
   }

   next();
}

