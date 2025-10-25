import { Router } from "express";
import { deleteFilm, getAllFilms, getFilm, postFilm, putFilm } from "../controllers/film.controller.js";

const filmRoute = Router()
filmRoute.get('/', getAllFilms)
filmRoute.get('/:id', getFilm)
filmRoute.post('/', postFilm)
filmRoute.put('/:id', putFilm)
filmRoute.delete('/:id', deleteFilm)
export default filmRoute;