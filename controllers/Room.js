const { Room } = require("../models");

exports.insert  = async(req, res) =>{
    try {
        const nameRooms = {...req.body};
       const Post=  await Room.create(nameRooms);
       if(!Post) return res.send({message: "an error occurred while inserting the room"})
       res.send({message: "Room created successfully"})
    } catch (error) {
        res.send({message: "Room failed to create"})
    }
}

exports.getAll = async (req, res) =>{
    try {
        const getRooms = await Room.findAll();
        if(!getRooms) return res.send({message: "Room not found"});
        res.status(200).json(getRooms);
    } catch (error) {
        res.send({message: "Error while getting rooms"});
    }
}

exports.getId = async(req, res) =>{
    const { id} = req.params;
    try {
        const getRoomId = await Room.findByPk(id);
        if(!getRoomId) return res.status(404).send({ message: 'Room not found' });
        res.send(getRoomId)
    } catch (error) {
        res.send({message: error.message})
    }
}