const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Canvas1', ((err)=>{
    if(!err)
        console.log('MongoDB connection succeeded');
    else
        console.log(JSON.stringify(err,undefined,2));
}));

module.exports = mongoose;