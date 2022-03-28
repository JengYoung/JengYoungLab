import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';

import { GraphQLSchema } from 'graphql';
import 'reflect-metadata';
import { buildSchema, makeSchema } from 'type-graphql';
import { TestResolver } from './resolvers/test.resolver';

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

  server.listen(PORT, () => {
    /* eslint-disable-next-line no-console */
    console.log(`listening to port ${PORT}...`);
  });
})();
