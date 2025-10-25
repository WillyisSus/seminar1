import express from "express";
import sequelize from "./configs/database.js";
import actorRoute from "./routes/actor.route.js";
import filmRoute from "./routes/film.route.js";
import { configDotenv } from "dotenv";
import YAML from "yamljs";
import {serve, setup} from "swagger-ui-express";
import loggerHelper from "./utils/loggerHelper.js";
configDotenv()
const swaggerDoc = YAML.load('./openapi.yaml')
const app = express();
app.use(express.json());
app.use(loggerHelper)
const port = 3000;

app.get('/', (req, res) => {
    res.send('MySQL + Express connected!');
});

app.use('/actors', actorRoute)
app.use('/films', filmRoute)
app.use('/api-doc', serve, setup(swaggerDoc))
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("DATABASE CONNECTED!!!")
        await sequelize.sync({force:false});
        app.listen(port, () => {
            console.log("Server running on port: " + port);
        })
    } catch (error) {
        console.log(error.stack)
    }
}


startServer();