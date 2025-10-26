import { Router } from "express";
import { getActor, getAllActors, postActor, putActor, deleteActor } from "../controllers/actor.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const actorRoute = Router();

actorRoute.get('/', getAllActors);
actorRoute.get('/:id', getActor);
actorRoute.post('/', protectRoute, postActor);
actorRoute.put('/:id', protectRoute, putActor);
actorRoute.delete('/:id', protectRoute, deleteActor)

export default actorRoute;