import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class AddressesModel extends Model {
  declare id: number;
  declare number: string;
  declare street: number;
  declare district: number;
  declare city: string;
  declare state: string;
  declare cep: string;
  declare complement: string;
  declare user_id: number;
}

AddressesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    district: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
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
    tableName: 'addresses',
    timestamps: false,
    sequelize,
  },
);

export default AddressesModel;
