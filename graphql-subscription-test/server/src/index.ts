import { config as dotenvConfig } from 'dotenv';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { GraphQLSchema } from 'graphql';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { TestResolver } from './resolvers/test.resolver';

import { createServer } from 'http';
import cors from 'cors';

dotenvConfig();

const PORT = process.env.BASE_PORT;

(async () => {
  const GraphQLSchema = await buildSchema({
    resolvers: [TestResolver],
  });

  const app = express();
  const server = createServer(app);
  const corsOptions = {
    origin: '*',
  };
  app.use(cors(corsOptions));

  app.get('/', (req, res) => {
    res.send('Hello!');
  });

  /**
   * NOTE: apollo-server configuration
   */
  const apolloServer = new ApolloServer({
    schema: GraphQLSchema,
    context: ({ req, res }) => {
      return {
        req,
        res,
      };
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: corsOptions });

  server.listen(PORT, () => {
    /* eslint-disable-next-line no-console */
    console.log(`listening to port ${PORT}...`);
  });
})();
