import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product type',
  fields() {
    return {
      _id: { type: GraphQLID },
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      thumbnail: { type: GraphQLString },
      price: { type: GraphQLInt },
    };
  },
});

export { ProductType };
