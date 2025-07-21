import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface ItemAttributes {
  id: number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ItemCreationAttributes extends Optional<ItemAttributes, "id"> {}

export class Item
  extends Model<ItemAttributes, ItemCreationAttributes>
  implements ItemAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Item.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Item",
    tableName: "items",
    timestamps: true,
  }
);
