const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/newToDo').on('open', ()=>{
    console.log("MongoDB Connected");
}).on('error', ()=>{
    console.log("MongoDB connection error");
});

module.exports = connection;