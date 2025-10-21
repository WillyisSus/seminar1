import express from "express";
import morgan from "morgan";
import sequelize from "./configs/database.js";
import actorRoute from "./routes/actor.route.js";
import filmRoute from "./routes/film.route.js";
import { configDotenv } from "dotenv";
import YAML from "yamljs";
import {serve, setup} from "swagger-ui-express";
import logger from "./utils/logger.js";
import morganHttpHelper from "./utils/morgan.js";
configDotenv()
const swaggerDoc = YAML.load('./openapi.yaml')
const app = express();
app.use(express.json());

// const customString = ':method :url :status :remote-addr - :remote-user  :res[content-length] - :response-time ms'
app.use(morgan('combined'))
app.use(morganHttpHelper)
const port = 3000;
// const db = mysql2.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "vOvieTlonG0108@",
//     database: "sakila",
// })

// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed: ' + err.stack);
//         return;
//     }
//     console.log('Connected to MySQL as ID ' + db.threadId);
// });


// Simple route to test
app.get('/', (req, res) => {
    res.send('MySQL + Express connected!');
});

app.use('/actors', actorRoute)
app.use('/films', filmRoute)
app.use('/api-doc', serve, setup(swaggerDoc))
const startServer = async () => {
    try {
        // console.log(sequelize.config)
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