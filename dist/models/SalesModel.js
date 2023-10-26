"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _database = require('../config/database');

class SalesModel extends _sequelize.Model {
  
  
  
  
  
}

SalesModel.init(
  {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    created_at: {
      type: _sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: _sequelize.DataTypes.NOW,
    },
    updated_at: {
      type: _sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: _sequelize.DataTypes.NOW,
    },
    confirmed_sale: {
      type: _sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    tableName: 'sales',
    timestamps: false,
    sequelize: _database.sequelize,
  },
);

exports. default = SalesModel;
