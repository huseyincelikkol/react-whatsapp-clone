const Room = require("../models/Room.js")

const createRoom = async(req, res) => {
    const name = req.body.groupName;

    try {
        const newRoom = await Room.create({name})
        res.status(201).json(newRoom)

    } catch (error) {
        res.status(500).json(error)

    }
}

const allRoom = async(req,res) =>{
    try {
        const getRooms = await Room.find();
        res.status(200).json(getRooms)
    } catch (error) {
        res.status(500).json(error)
    }
}

const detailRoom = async(req, res) => {
    try {
        const detail = await Room.findById(req.params.id)
        res.status(200).json(detail)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {createRoom,allRoom,detailRoom}