const mongoose = require('mongoose');

var Room = mongoose.model('Room',{
    Title: {type:String}
})

module.exports = {Room};