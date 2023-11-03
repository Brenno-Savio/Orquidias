import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import homeRoutes from './routes/homeRoute';
import usersRoutes from './routes/usersRoutes';

dotenv.config();

class App {
  app: express.Application;
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/user/', usersRoutes);
  }
}

export default new App().app;
