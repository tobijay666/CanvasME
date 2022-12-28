const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/Canvas1',{userNewUrlParser: true}).then(()=>{
mongoose.connect('mongodb://localhost:27017/Canvas1').then(()=>{
    console.log("Conneted to DB");
}).catch((e) => {
    console.log("Error DB not connected");
    console.log(e);
});

// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};
