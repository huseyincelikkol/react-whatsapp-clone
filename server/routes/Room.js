const express = require('express')
const { createRoom,allRoom,detailRoom } = require('../controllers/Room.js')



const router = express.Router()

router.post('/create/room', createRoom)
router.get('/all/room', allRoom)
router.get('/detail/room/:id', detailRoom)


module.exports = router