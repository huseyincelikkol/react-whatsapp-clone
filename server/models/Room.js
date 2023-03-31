const moongoose = require('mongoose')


const roomSchema = new moongoose.Schema({
    name: String
    

}, {timestamps: true})

module.exports = moongoose.model('room',roomSchema);