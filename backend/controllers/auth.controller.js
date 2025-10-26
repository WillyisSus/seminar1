/*
INSERT INTO `sakila`.`user`
(`user_id`,
`username`,
`password`,
`created_at`)
VALUES
(1, 'admin', 'admin_pass123'),
(2, 'jsmith', 'smithP@ssw0rd'),
(3, 'test_user', 'test'),
(4, 'api_service', 'service_key_98765'),
(5, 'emartinez', 'emily_2025');

*/

import User from "../models/user.model.js";
import Joi from "joi";
import { generateToken } from "../utils/token.js";
const JWT_SECRET = process.env.JWT_SECRET

const schema = Joi.object({
    username: Joi.string().max(45).min(1).required(),
    password: Joi.string().max(255).min(1).required()
})
export const login = async (req, res) => {
    const body = req?.body;
    if (body){
        const {value, error} = schema.validate(body);
        if (error){
            res.status(400).send({msg: error?.details})
        }
        try {
            const user = await User.findOne({
                where: {
                    ...body      
                }
            })
            if (user){
                console.log(JSON.stringify(user))
                generateToken(user?.user_id, res)
                res.json({
                    msg: "Login sucessfully"
                })
            }
        } catch (error) {
            res.status(500).send({msg: "Internal Server Error"})
        }
    }else{
        res.status(400).send({msg:"Bad Request"})
    }
} 