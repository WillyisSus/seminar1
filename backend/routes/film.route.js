import { Router } from "express";
import { getAllFilms, getFilm, postFilm } from "../controllers/film.controller.js";

const filmRoute = Router()
filmRoute.get('/', getAllFilms)
filmRoute.get('/:id', getFilm)
filmRoute.post('/', postFilm)
export default filmRoute;