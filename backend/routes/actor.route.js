import { Router } from "express";
import { getActor, getAllActors, postActor, putActor, deleteActor } from "../controllers/actor.controller.js";
const actorRoute = Router();

actorRoute.get('/', getAllActors);
actorRoute.get('/:id', getActor);
actorRoute.post('/', postActor);
actorRoute.put('/:id', putActor);
actorRoute.delete('/:id', deleteActor)

export default actorRoute;