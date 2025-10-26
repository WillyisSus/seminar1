import { Router } from "express";
import { deleteFilm, getAllFilms, getFilm, postFilm, putFilm } from "../controllers/film.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const filmRoute = Router()
filmRoute.get('/', getAllFilms)
filmRoute.get('/:id', getFilm)
filmRoute.post('/', protectRoute, postFilm)
filmRoute.put('/:id',protectRoute, putFilm)
filmRoute.delete('/:id', protectRoute, deleteFilm)
export default filmRoute;