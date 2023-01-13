const mongoose = require('mongoose');

var User = mongoose.model('User',{
    Name: {
        type:String,
        trim: true,
        required:true,
        unique: "This Username already exists!"
    },
    Email: {
        type:String,
        required: true,
        unique:true
    },
    Password: {
        type:String,
        required:true,
        minlength:8
    },
    sessions:[{
        token:{
            type:String
        }

    }]
    
})

module.exports = {User};