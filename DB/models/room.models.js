const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength:1,
        trim: true

    }
})

const Room = mongoose.model('Room',RoomSchema);

module.exports = { Room }