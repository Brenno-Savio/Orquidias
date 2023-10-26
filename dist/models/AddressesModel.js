"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _database = require('../config/database');

class AddressesModel extends _sequelize.Model {
  
  
  
  
  
  
  
  
  
}

AddressesModel.init(
  {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    district: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    cep: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false,
    },
    complement: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
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
  },
  {
    tableName: 'addresses',
    timestamps: false,
    sequelize: _database.sequelize,
  },
);

exports. default = AddressesModel;
