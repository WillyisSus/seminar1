import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";
const User = sequelize.define('User',{
   user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true 
  },
  
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true 
  },
  
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  
  created_at: {
    type: DataTypes.DATE, 
    allowNull: false,
    defaultValue: DataTypes.NOW 
  }
}, {
    tableName: 'user',        
    timestamps: false          
                        
})

export default User;