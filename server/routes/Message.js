const express = require('express')
const { createMessage,detailMessage } = require('../controllers/Message.js')



const router = express.Router()

router.post('/create/message', createMessage)
router.get('/detail/message/:id', detailMessage)



module.exports = router