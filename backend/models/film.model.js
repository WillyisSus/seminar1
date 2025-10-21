import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";
const Film = sequelize.define('Film',{
   film_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  language_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
    // Note: You'll likely want to add a foreign key reference here
  },
  original_language_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  rental_duration: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 3
  },
  rental_rate: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
    defaultValue: 4.99
  },
  length: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  replacement_cost: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 19.99
  },
  rating: {
    type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'),
    allowNull: true,
    defaultValue: 'G'
  },
  special_features: {
    type: DataTypes.STRING, // Sequelize handles SET as a comma-separated string
    allowNull: true
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
    tableName: 'film',
    timestamps: false
})

export default Film;