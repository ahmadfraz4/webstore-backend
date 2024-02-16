let express = require('express');
const { auth, authorizeRole } = require('../middleware/auth');
const { sendChat, fetchChat, userChats, createRoom, chatsOfRoom, allRooms } = require('../controllers/message.controller');
// let {} = require('../middleware/auth')
let router = express.Router();




router.route('/room/create/:reciever').get(auth, createRoom)
router.route('/room/all').get(auth,authorizeRole('admin') , allRooms)
router.route('/room/chats/:roomId').get(auth, chatsOfRoom)
router.route('/message/send/:room').post(auth, sendChat)
router.route('/message/all').get(auth,authorizeRole('admin') , fetchChat)
router.route('/message/user/:id').get(auth,userChats)


module.exports = router