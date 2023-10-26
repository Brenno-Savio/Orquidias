"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelizetypescript = require('sequelize-typescript');
require('dotenv').config();

 const sequelize = new (0, _sequelizetypescript.Sequelize)({
  dialect: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',
}); exports.sequelize = sequelize;
