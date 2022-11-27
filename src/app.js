/* eslint-disable import/first */
//import dotenv from 'dotenv';

//dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
import 'dotenv/config';
import express from 'express';
import routes from './routes';
// Importando nossa database
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
