import { ProductModel } from '../models';

export interface IProduct {
  title: string;
  price: number;
  thumbnail: string;
  id: string;
}

export class Product {
  private static _instance: Product;

  static getInstance() {
    if (!this._instance) {
      this._instance = new Product();
    }
    return this._instance;
  }

  public uid: string;
  private constructor() {
    this.uid = (Math.random() * 100).toString(36);
  }

  async create(data: IProduct) {
    return ProductModel.create(data);
  }

  async getAll() {
    return ProductModel.find();
  }

  async getById(id: string) {
    return ProductModel.findById(id);
  }

  async update(id: string, data: Partial<IProduct>) {
    return ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    const bla = await ProductModel.findByIdAndDelete(id);
    console.log(bla);

    return bla;
  }
}
