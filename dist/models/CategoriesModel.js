"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _database = require('../config/database');
var _ClothesModel = require('./ClothesModel'); var _ClothesModel2 = _interopRequireDefault(_ClothesModel);

class CategoryModel extends _sequelize.Model {
  
  
}

CategoryModel.init(
  {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false,
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
    tableName: 'categories',
    timestamps: false,
    sequelize: _database.sequelize,
  },
);

CategoryModel.hasMany(_ClothesModel2.default, { foreignKey: 'category_id' });

exports. default = CategoryModel;
