import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class SalesModel extends Model {
  declare id: number;
  declare clothe_price: number;
  declare clothe_id: number;
  declare user_id: number;
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
  },
  {
    tableName: 'sales',
    timestamps: false,
    sequelize,
  },
);

export default SalesModel;
