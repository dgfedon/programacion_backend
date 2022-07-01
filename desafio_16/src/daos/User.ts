import { UserModel as UserModel } from "../models";


export interface IUser {
   id?: string;
   email: string;
   password: string;
}

export class User {
   static async create(data: IUser) {
      return UserModel.create(data)
   }


   static async getAll() {
      return UserModel.find()
   }

   static async getById(id: string) {
      return UserModel.findById(id)
   }

   static async getByEmail(email: string) {
      return UserModel.findOne({ email})
   }

   static async update(id: string, data: IUser) {
      return UserModel.findByIdAndUpdate(id, data, { new: true })
   }

   static async delete(id: string) { 
      return UserModel.findByIdAndDelete(id)
   }
}