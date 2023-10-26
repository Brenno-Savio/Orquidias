"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _database = require('../config/database');
var _urlConfig = require('../config/urlConfig'); var _urlConfig2 = _interopRequireDefault(_urlConfig);

class PictureModel extends _sequelize.Model {
  
  
  
  
}

PictureModel.init(
  {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    originalname: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: _sequelize.DataTypes.VIRTUAL,
      get() {
        return `${_urlConfig2.default.url}/images/${this.getDataValue('filename')}`;
      },
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
    tableName: 'pictures',
    timestamps: false,
    sequelize: _database.sequelize,
  },
);

exports. default = PictureModel;
