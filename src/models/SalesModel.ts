import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class SalesModel extends Model {
  declare id: number;
  declare clothe_price: number;
  declare clothe_id: number;
  declare user_id: number;
  declare confirmed_sale: boolean;
}

SalesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    confirmed_sale: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    clothe_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: 'sales',
    timestamps: false,
    sequelize,
  },
);

export default SalesModel;
