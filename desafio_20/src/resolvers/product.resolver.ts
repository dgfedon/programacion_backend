import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { DaoFactory } from '../daos';
import { ProductType } from '../graphql/types/Product';

const product = DaoFactory.getDao('product');

const getProducts = {
  type: new GraphQLList(ProductType),
  description: 'return products',
  resolve: async function () {
    return product.getAll();
  },
};

const getProduct = {
  type: ProductType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  description: 'return product by id',
  resolve: async function (_, { id }) {
    const foundProduct = await product.getById(id);

    if (!foundProduct) throw new Error('Product not found');

    return foundProduct;
  },
};

const createProduct = {
  type: ProductType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    thumbnail: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_, data) => {
    const response = await product.create(data);

    return response;
  },
};

const updateProduct = {
  type: ProductType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    price: { type: GraphQLInt },
  },
  resolve: async (_, data) => {
    const response = await product.update(data.id, data);

    return response;
  },
};

const deleteProduct = {
  type: ProductType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, data) => {
    const response = await product.delete(data.id);

    return response;
  },
};

export const ProductResolver = {
  mutations: {
    createProduct,
    updateProduct,
    deleteProduct
  },
  queries: {
    getProduct,
    getProducts,
  },
};
