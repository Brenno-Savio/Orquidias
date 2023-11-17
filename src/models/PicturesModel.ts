import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import urlConfig from '../config/urlConfig';

class PicturesModel extends Model {
  declare id: number;
  declare originalname: string;
  declare filename: string;
  declare clothe_id: number;
}

PicturesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    originalname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${urlConfig.url}/images/${this.getDataValue('filename')}`;
      },
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
    tableName: 'pictures',
    timestamps: false,
    sequelize,
  },
);

export default PicturesModel;
