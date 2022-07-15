import { ProductModel as ProductModel } from "../models";


interface IProduct {
   title: string;
   price: number;
   thumbnail: string;
   id: string;
}

export class Product {
   static async create(data: IProduct) {
      return ProductModel.create(data)
   }

   static async getAll() {
      return ProductModel.find()
   }

   static async getById(id: string) {
      return ProductModel.findById(id)
   }

   static async update(id: string, data: IProduct) {
      return ProductModel.findByIdAndUpdate(id, data, { new: true })
   }

   static async delete(id: string) { 
      return ProductModel.findByIdAndDelete(id)
   }
}