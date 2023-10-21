import bcryptjs, { hash } from 'bcryptjs';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import AddressesModel from './AddressesModel';
import ClothesModel from './ClothesModel';

class UserModel extends Model {
  declare id: number;
  declare name: string;
  declare lastname: string;
  declare cpf: string;
  declare email: string;
  declare password: string;
  declare password_hash: string;
  declare admin: boolean;

  async passwordValidator(
    password: string,
  ): Promise<boolean> {
    const valiadation = await bcryptjs.compare(
      password,
      this.password_hash,
    );

    return valiadation;
  }
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Name field cannot be null',
        },
      },
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Last name field cannot be null',
        },
      },
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Last name field cannot be null',
        },
      },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
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
      type: DataTypes.VIRTUAL,
      defaultValue: '',
      validate: {
        validatePassword: (password: string) => {
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
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      validate: {
        notNull: {
          msg: 'Admin field cannot be null',
        },
      },
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    sequelize,
  },
);

UserModel.addHook('beforeSave', async (user: UserModel) => {
  if (user.password) {
    user.password_hash = await hash(user.password, 8);
  }
});

UserModel.hasMany(ClothesModel, { foreignKey: 'user_id' });
UserModel.hasMany(SalesModel, { foreignKey: 'user_id' });
UserModel.hasOne(AddressesModel, { foreignKey: 'user_id' });

export default UserModel;
