let mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId, ref : 'user', required:true 
    },
    chat : {
        type :String
    },
    roomId : {
        type :mongoose.Schema.Types.ObjectId, ref : 'room', required:true
    }
})
let messageModel = mongoose.model('chat',messageSchema)

module.exports = {messageModel}