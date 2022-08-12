import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { ProductResolver } from '../resolvers/product.resolver';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: {
    ...ProductResolver.queries,
  },
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: {
    ...ProductResolver.mutations,
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export { schema };
