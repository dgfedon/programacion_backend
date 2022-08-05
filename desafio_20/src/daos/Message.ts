import { MessageModel } from '../models';

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
  public uid: string;
  private static _instance: Message;

  static getInstance() {
    if (!this._instance) {
      this._instance = new Message();
    }
    return this._instance;
  }
  private constructor() {
    this.uid = (Math.random() * 100).toString(36);
  }

  async create(data: IMessage) {
    return MessageModel.create(data);
  }

  async getAll() {
    return MessageModel.find();
  }

  async getById(id: string) {
    return MessageModel.findById(id);
  }

  async update(id: string, data: IMessage) {
    return MessageModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return MessageModel.findByIdAndDelete(id);
  }
}
