import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import categoriesRoutes from './routes/categoriesRoutes';
import clothesRoutes from './routes/clothesRoutes';
import homeRoutes from './routes/homeRoute';
import pictureRoutes from './routes/pictureRoutes';
import salesRoutes from './routes/salesRoutes';
import tokenRoutes from './routes/tokenRoutes';
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
    this.app.use('/token/', tokenRoutes);
    this.app.use('/category/', categoriesRoutes);
    this.app.use('/clothe/', clothesRoutes);
    this.app.use('/sale/', salesRoutes);
    this.app.use('/picture/', pictureRoutes);
  }
}

export default new App().app;
