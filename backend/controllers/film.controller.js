import { where } from "sequelize";
import Film from "../models/film.model.js";
import Joi from "joi";
const schema = Joi.object({
  title: Joi.string()
    .max(255)
    .required(),

  description: Joi.string()
    .allow(null, ''), // Allows the field to be optional

  release_year: Joi.number()
    .integer()
    .min(1888) // The year the first film was recorded
    .max(new Date().getFullYear()), // Can't be a future year

  language_id: Joi.number()
    .integer()
    .positive()
    .required(),

  original_language_id: Joi.number()
    .integer()
    .positive()
    .allow(null),

  rental_duration: Joi.number()
    .integer()
    .positive()
    .required(),

  rental_rate: Joi.number()
    .precision(2) // Validates up to 2 decimal places
    .required(),

  length: Joi.number()
    .integer()
    .positive()
    .allow(null),

  replacement_cost: Joi.number()
    .precision(2)
    .required(),

  rating: Joi.string()
    .valid('G', 'PG', 'PG-13', 'R', 'NC-17')
    .default('G'),

  special_features: Joi.string()
    .allow(null, '')
});

export const getAllFilms = async (req, res) => {
    try {
        const films = await Film.findAll();
        if (films){
            res.json(films)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"})
    }
}

export const getFilm = async (req, res) => {
    const reqID =  req.params.id
    if (reqID){
        try {
            const film = await Film.findOne({
                where: {
                    film_id: reqID
                }
            })
            res.json(film)
        } catch (error) {   
            console.log(error)
            res.status(500).send({msg: 'Internal Server Error'})
        }
    }
}

export const postFilm = async (req, res) => {
    const newFilm = req.body;
    if (newFilm){
        const {value, error} = schema.validate(newFilm);
        console.log(value, error)
        if (error){
            res.status(400).send({msg: error?.details})
        }
        try {
            const createdFilm =  await Film.create({
                ...newFilm
            })
            if (createdFilm){
                res.json(createdFilm)
            }
        } catch (error) {
            res.status(400).send({msg: "Bad Request"})
        }
      
    }else{
        res.status(400).send({msg: "Bad Request"})
    }
}

export const putFilm = async (req, res) => {
  const reqID = req.params.id
  if (parseInt(reqID) <= 0 ){
    res.status(400).send({msg: "Bad Request"})
  }
  const film = req.body;
  if (film && reqID){
      const {value, error} = schema.validate(film);
      console.log(value, error)
      if (error){
          res.status(400).send({msg: error?.details})
      }
      try {
          const updatedFilm =  await Film.update({
              ...film
          }, {
            where: {
              film_id: reqID
          }})
          if (updatedFilm){
              res.json({"updated_row": updatedFilm})
          }
      } catch (error) {
          res.status(500).send({msg: "Internal Server Error"})
      }
    
  }else{
      res.status(400).send({msg: "Bad Request"})
  }
}

export const deleteFilm = async (req, res) => {
  const reqID = req.params.id
  if (parseInt(reqID) <= 0 ){
    res.status(400).send({msg: "Bad Request"})
  }
  if (reqID){
    try {
      const deletedRows = await Film.destroy({
        where: {
          film_id: reqID
        }
      })
      res.json({"deleted_rows": deletedRows})
    } catch (error) {
      res.status(500).send({msg: error})
      
    }
  }else{
    res.status(400).send({msg: "Bad Request"})
  }
}