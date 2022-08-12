import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { DaoFactory, IProduct } from '../daos';

export class ProductController {
  private static productDao = DaoFactory.getDao('product');

  static async getProducts(req: Request, res: Response) {
    const products = await ProductController.productDao.getAll();

    res.json(products);
  }

  static async getProduct(req: Request, res: Response) {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }

    const result = await ProductController.productDao.getById(id);

    res.json(result);
  }

  static async createProduct(req: Request, res: Response) {
    const product = req.body.product;
    try {
      const result = await ProductController.productDao.create(product);
      res.status(201).json(result);
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    try {
      const result = await ProductController.productDao.delete(id);
      console.log(result);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async updateProduct(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body.product;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    try {
      const result = await ProductController.productDao.update(id, data);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}
