import { config as dotenvConfig } from 'dotenv';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// import { GraphQLSchema } from 'graphql';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { PubSub } from 'graphql-subscriptions';
import { TestResolver } from './resolvers/test.resolver';

import { createServer } from 'http';
import cors from 'cors';

import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

// import { PubSub } from 'apollo-server';
// import { RedisPubSub } from 'graphql-redis-subscriptions';
import { MessageResolver } from './resolvers/message.resolver';
import { GraphQLSchema } from 'graphql';

dotenvConfig();

const PORT = process.env.BASE_PORT;

(async () => {
  const pubSub = new PubSub();

  const schema: GraphQLSchema = await buildSchema({
    resolvers: [TestResolver, MessageResolver],
    pubSub,
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

  const wsServer = new ws.Server({
    server,
    path: '/graphql',
  });

  /**
   * NOTE: apollo-server configuration
   */
  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              wsServer.close();
            },
          };
        },
      },
    ],
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
    useServer({ schema }, wsServer);
    // console.log(wsServer);
    /* eslint-disable-next-line no-console */
    console.log(`listening to port ${PORT}...`);
  });
})();
