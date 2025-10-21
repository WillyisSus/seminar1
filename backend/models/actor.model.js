import { DataTypes } from 'sequelize';
import sequelize from '../configs/database.js'; // Import the connection

const Actor = sequelize.define('Actor', {
  // Model attributes are defined here
  actor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_update:{
    type: 'TIMESTAMP',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  // Other model options go here
  tableName: 'actor',   // Explicitly tell Sequelize the table name
  timestamps: false     // Disable timestamps (createdAt and updatedAt)
});

export default Actor;