import {Router} from 'express';
import {apolloExpress, graphiqlExpress} from 'apollo-server';
// import {addResolveFunctionsToSchema} from 'graphql-tools';
import schema from '../graphql/schemas';

const router = Router();

router.post('/graphql', apolloExpress(req => ({
  schema,
  context: {user: req.user},
})));

router.get('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

export default router;
