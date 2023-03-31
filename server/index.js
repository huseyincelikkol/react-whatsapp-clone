const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const dotenv = require('dotenv');
const database = require('./config/database.js');
const Room = require('./routes/Room.js')
const Message = require('./routes/Message.js')
const Pusher = require("pusher");
const mongoose = require("mongoose");

dotenv.config();

const pusher = new Pusher({
    appId: process.env.PUSHER_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.CLUSTER,
    useTLS: true
});


const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/', Room)
app.use('/', Message)

const PORT = process.env.PORT || 5000;

database();

const db = mongoose.connection;

db.once("open", () => {
    console.log("artık bağlanabilir misin?");
    const roomCollection = db.collection('rooms')
    const chanceStream = roomCollection.watch()

    chanceStream.on('change', (change) => {
        if (change.operationType === "insert") {
            const roomDetails = change.fullDocument;
            pusher.trigger('rooms', 'inserted', roomDetails)
        } else {
            console.log("trigger olayın gerçekleşmedi");
        }

    })
    const msgCollection = db.collection('messages');
    const changeStream1 = msgCollection.watch();

    changeStream1.on('change', (change) => {
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', messageDetails)
        } else {
            console.log("trigger olayın gerçekleşmedi..")
        }
    })

})

app.listen(PORT, () => {
    console.log("server is running on port", PORT)
})