import { Request, Response } from "express";
import { Message, Product, User } from "../daos";
import bcrypt from 'bcrypt'

export class AuthController {

   static async main(req: Request, res: Response) {
      if (!req.user) {
         return res.redirect('/login');
      }

      const productos = await Product.getAll();

      let messages = await Message.getAll();

      res.render('main', { title: 'Productos', productos, messages });
   }

   static async renderLogin(req: Request, res: Response) {
      res.render('login', { title: 'Login' });
   }

   static async renderRegister(req: Request, res: Response) {
      res.render('register', { title: 'Login' });
   }

   static async register(req: Request, res: Response) {
      try {
         if (!req.body.email || !req.body.password) {
            return res.json({
               error: true,
               message: "Missing information"
            })
         }

         const user = await User.getByEmail(req.body.email);

         if (user) return res.json({ error: true, message: 'Email ya registrado' })

         const hashedPw = await bcrypt.hash(req.body.password, 10);

         await User.create({
            email: req.body.email,
            password: hashedPw
         })

         res.json({
            error: false,
            message: 'Usuario creado correctamente'
         })

      } catch (err) {
         console.log(err);
         return res.json({ error: err })
      }
   }

   static async login(req: Request, res: Response) {
      return res.json({
         redirect: '/',
      });
   }

   static async logout(req: Request, res: Response) {
      if (!req.user) return res.redirect('/login');
      const email = (req.user as any).email
      req.logout((err) => {
         if (err) return
         return res.render('logout', { title: 'Logout', name: email });
      })
   }
}