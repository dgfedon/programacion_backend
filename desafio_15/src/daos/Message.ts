import { MessageModel as MessageModel } from "../models";


interface IMessage {
   author: {
      id: string;
      name: string;
      lastname: string;
      alias: string;
      age: number;
      avatar: string;
   };
   text: string;
   date: Date;
   id?: string;
}

export class Message {
   static async create(data: IMessage) {
      return MessageModel.create(data)
   }

   static async getAll() {
      return MessageModel.find()
   }

   static async getById(id: string) {
      return MessageModel.findById(id)
   }

   static async update(id: string, data: IMessage) {
      return MessageModel.findByIdAndUpdate(id, data, { new: true })
   }

   static async delete(id: string) { 
      return MessageModel.findByIdAndDelete(id)
   }
}