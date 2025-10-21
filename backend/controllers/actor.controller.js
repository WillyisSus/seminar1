import Actor from "../models/actor.model.js";
export const getAllActors = async (req, res) => {
    try {
        const actors = await Actor.findAll()
        res.json(actors)
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error"});
    }
}
export const getActor = async (req, res) => {
    const reqId = req.params.id;
    if (reqId < 0) {
        return res.status(400).send('Bad Request');
    }
    try {
        const actor = await Actor.findOne({
            where:{
                actor_id: reqId
            }
        })
        if (actor)
            res.json(actor)
        else {
            res.status(404).send({msg: "Not found"})
        };
    } catch (error) {
        res.status(500).send({msg: 'Internal Server Error'})
    }
}
export const postActor = async (req, res) => {
    const {first_name, last_name} = req.body;
    if (first_name && last_name) {
        try {
            const newActor = await Actor.create({
                first_name, last_name
            })
            res.json(newActor);
        } catch (error) {   
            res.status(500).send("Internal Server Error")
        }
    } else {
        res.status(400).send({msg: "Bad Request"})
    }

}

export const putActor = async (req, res) => {
     const {first_name, last_name} = req.body;
    const reqId = req.params.id;
    if (first_name && last_name && reqId) {
        const updatedActor = await Actor.update({
            first_name, last_name
        }, {
            where: {actor_id: reqId}
        })
        res.json(updatedActor)
    }else {
        res.status(400).send({msg: "Bad Request"})
    }
}

export const deleteActor = async (req, res) => {
    const reqId = req.params.id;
    if (reqId){
        const deletedRow = await Actor.destroy({
            where: {
                actor_id: reqId
            }
        })
        if (deletedRow > 0)
            res.status(200).send("Success")
        else 
            res.status(400).send({msg: "Bad Request"})
    }else{
        res.status(400).send({msg: "Bad Request"})
    }
}