import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import PictureModel from './PicturesModel';
import SalesModel from './SalesModel';

class ClothesModel extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
  declare stock: number;
  declare color: string;
  declare slug: string;
  declare user_id: number;
  declare category_id: number;
}

ClothesModel.init(
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
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
    tableName: 'clothes',
    timestamps: false,
    sequelize,
  },
);

ClothesModel.addHook('beforeSave', (clothe: ClothesModel) => {
  if (clothe.slug) {
    clothe.slug = `${clothe.name.replace(' ', '-')}${clothe.color}`;
  }
})

ClothesModel.hasMany(PictureModel, { foreignKey: 'clothe_id' });
ClothesModel.hasMany(SalesModel, { foreignKey: 'clothe_id' });


export default ClothesModel;
