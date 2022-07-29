import { Message } from './Message';
import { Product } from './Product';
import { User } from './User';

export class DaoFactory {
  static getDao<T extends EntityType>(
    entity: T,
    db: 'mongo' | 'firebase' | string = 'mongo'
  ): Return<T> {
    switch (db) {
      case 'mongo': {
        switch (entity) {
          case 'user':
            return User.getInstance() as Return<T>;
          case 'message':
            return Message.getInstance() as Return<T>;
          case 'product':
            return Product.getInstance() as Return<T>;
          default:
            throw new Error('No se especifico que entidad utilizar para el DAO');
        }
      }
      case 'firebase': {
        switch (entity) {
          case 'user':
            return User.getInstance() as Return<T>;
          case 'message':
            return Message.getInstance() as Return<T>;
          case 'product':
            return Product.getInstance() as Return<T>;
          default:
            throw new Error('No se especifico que entidad utilizar para el DAO');
        }
      }
    }
  }
}

type EntityType = 'user' | 'message' | 'product';
type Return<T> = T extends 'user'
  ? User
  : T extends 'message'
  ? Message
  : T extends 'product'
  ? Product
  : null;
