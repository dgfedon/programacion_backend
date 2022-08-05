import { Request, Response } from 'express';
import { cpus } from 'node:os';
import { DaoFactory, Message, Product } from '../daos';

export class MainController {
  static messageDao = DaoFactory.getDao('message');
  static productDao = DaoFactory.getDao('product');

  static async renderMainPage(req: Request, res: Response) {
    if (!req.user) {
      return res.redirect('/login');
    }

    const productos = await MainController.productDao.getAll();

    let messages = await MainController.messageDao.getAll();

    res.render('main', { title: 'Productos', productos, messages });
  }

  static async renderServerInfoPage(req, res) {
    const info = {
      args: process.argv.slice(2),
      os: process.platform,
      node_v: process.version,
      memory: process.memoryUsage().heapUsed,
      path: process.execPath,
      pid: process.pid,
      dir: process.cwd(),
      cpus: cpus().length,
    };

    res.render('info', { title: 'Info', info });
  }
}
