import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import ClothesModel from './ClothesModel';

class CategoriesModel extends Model {
  declare id: number;
  declare name: string;
}

CategoriesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
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
    tableName: 'categories',
    timestamps: false,
    sequelize,
  },
);

CategoriesModel.hasMany(ClothesModel, { foreignKey: 'category_id' });

export default CategoriesModel;
