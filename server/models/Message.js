const moongoose = require('mongoose')


const messageSchema = new moongoose.Schema({
    name: String,
    message: String,
    timestamps: String,
    uid: String,
    roomid:String

}, {timestamps: true})

module.exports = moongoose.model('message',messageSchema);