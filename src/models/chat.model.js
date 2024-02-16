let mongoose = require('mongoose');

let chatSchema = new mongoose.Schema({
    users : [{
        type: mongoose.Schema.ObjectId, ref:'user'
    }]
})

let roomModel = mongoose.model('room', chatSchema)
module.exports = {roomModel}
