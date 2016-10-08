import {addMockFunctionsToSchema, buildSchemaFromTypeDefinitions, addResolveFunctionsToSchema} from 'graphql-tools';
import * as mocks from '../mocks';
import Author from './Author.gql';
import Post from './Post.gql';
import Query from './Query.gql';
import Mutation from './Mutation.gql';
import schema from './schema.gql';
import resolveFunctions from '../resolvers';
export const raw = [
  Author,
  Post,
  Query,
  Mutation,
  schema,
];
const executable = buildSchemaFromTypeDefinitions(raw);
// export const mocked = addMockFunctionsToSchema({
//   schema: executable,
//   mocks,
//   preserceResolvers: false,
// });


addResolveFunctionsToSchema(
  executable,
  resolveFunctions,
);


export default executable;
