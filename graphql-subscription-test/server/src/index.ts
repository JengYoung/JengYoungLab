import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import express from 'express';
import { createServer } from 'http';
import cors from 'cors';

const a = 1;
const PORT = process.env.BASE_PORT;

(async () => {
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
    console.log(`listening to port ${PORT}...`);
  });
})();
