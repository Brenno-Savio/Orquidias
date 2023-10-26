"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _sequelize = require('sequelize');
var _database = require('../config/database');
var _AddressesModel = require('./AddressesModel'); var _AddressesModel2 = _interopRequireDefault(_AddressesModel);
var _ClothesModel = require('./ClothesModel'); var _ClothesModel2 = _interopRequireDefault(_ClothesModel);
var _SalesModel = require('./SalesModel'); var _SalesModel2 = _interopRequireDefault(_SalesModel);

class UserModel extends _sequelize.Model {
  
  
  
  
  
  
  
  

  async passwordValidator(
    password,
  ) {
    const valiadation = await _bcryptjs2.default.compare(
      password,
      this.password_hash,
    );

    return valiadation;
  }
}

UserModel.init(
  {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: _sequelize.DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Name field cannot be null',
        },
      },
      allowNull: false,
    },
    lastname: {
      type: _sequelize.DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Last name field cannot be null',
        },
      },
      allowNull: false,
    },
    cpf: {
      type: _sequelize.DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Last name field cannot be null',
        },
      },
      allowNull: false,
    },
    email: {
      type: _sequelize.DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'This email is not valid',
        },
        notNull: {
          msg: 'Email field cannot be null',
        },
      },
      allowNull: false,
      unique: true,
    },
    password: {
      type: _sequelize.DataTypes.VIRTUAL,
      defaultValue: '',
      validate: {
        validatePassword: (password) => {
          if (
            !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/.test(
              password,
            )
          ) {
            throw new Error(
              'The password must contain at least 8 and maximum 16 characters including at least 1 uppercase, 1 lowercase, one number and one special character.',
            );
          }
        },
      },
    },
    password_hash: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    admin: {
      type: _sequelize.DataTypes.BOOLEAN,
      validate: {
        notNull: {
          msg: 'Admin field cannot be null',
        },
      },
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
    tableName: 'users',
    timestamps: false,
    sequelize: _database.sequelize,
  },
);

UserModel.addHook('beforeSave', async (user) => {
  if (user.password) {
    user.password_hash = await _bcryptjs.hash.call(void 0, user.password, 8);
  }
});

UserModel.hasMany(_ClothesModel2.default, { foreignKey: 'user_id' });
UserModel.hasMany(_SalesModel2.default, { foreignKey: 'user_id' });
UserModel.hasOne(_AddressesModel2.default, { foreignKey: 'user_id' });

exports. default = UserModel;
