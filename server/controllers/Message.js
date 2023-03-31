const Message = require("../models/Message.js")

const createMessage = async (req, res) => {

    try {
        const newMessage = await Message.create(req.body)
        res.status(201).json(newMessage)

    } catch (error) {
        res.status(500).json(error)

    }
}
const detailMessage = async (req, res) => {

    try {
        const detailMessage = await Message.find({roomid : req.params.id})
        res.status(200).json(detailMessage)

    } catch (error) {
        res.status(500).json(error)

    }
}

module.exports = { createMessage,detailMessage }