"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _database = require('../config/database');
var _PicturesModel = require('./PicturesModel'); var _PicturesModel2 = _interopRequireDefault(_PicturesModel);
var _SalesModel = require('./SalesModel'); var _SalesModel2 = _interopRequireDefault(_SalesModel);

class ClothesModel extends _sequelize.Model {
  
  
  
  
  
  
  
  
}

ClothesModel.init(
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
    price: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false,
    },
    slug: {
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
    tableName: 'clothes',
    timestamps: false,
    sequelize: _database.sequelize,
  },
);

ClothesModel.addHook('beforeSave', (clothe) => {
  if (clothe.slug) {
    clothe.slug = `${clothe.name.replace(' ', '-')}${clothe.color}`;
  }
})

ClothesModel.hasMany(_PicturesModel2.default, { foreignKey: 'clothe_id' });
ClothesModel.hasMany(_SalesModel2.default, { foreignKey: 'clothe_id' });
ClothesModel.hasMany(_SalesModel2.default, { foreignKey: 'clothe_price' });


exports. default = ClothesModel;
