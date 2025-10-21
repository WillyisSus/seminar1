import {Sequelize} from 'sequelize';
import { configDotenv } from 'dotenv';
configDotenv();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,{
        dialect:'mysql',
        host:process.env.DB_HOST,
    }
)
export default sequelize