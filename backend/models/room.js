const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


var RoomSchema = new mongoose.Schema({
    Title: {
        type:String,
        unique: "This Room Already exists!",
        required:true
    }
})

// RoomSchema.pre('save', function (next) {
//     bcrypt.genSalt(6, (err, salt) => {
//         this.roomId = salt;
//         next();
//     });
//   });

// module.exports = {Room};
var Room = mongoose.model("Room", RoomSchema);
module.exports = Room;