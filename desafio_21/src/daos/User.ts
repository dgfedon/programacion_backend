import { UserModel } from '../models';

export interface IUser {
  id?: string;
  email: string;
  password: string;
}

export class User {
  private static _instance: User;

  static getInstance() {
    if (!this._instance) {
      this._instance = new User();
    }
    return this._instance;
  }

  public uid: string;
  private constructor() {
    this.uid = (Math.random() * 100).toString(36);
  }

  async create(data: IUser) {
    return UserModel.create(data);
  }

  async getAll() {
    return UserModel.find();
  }

  async getById(id: string) {
    return UserModel.findById(id);
  }

  async getByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async update(id: string, data: IUser) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return UserModel.findByIdAndDelete(id);
  }
}
