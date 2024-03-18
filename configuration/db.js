const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb+srv://shubhankarmaj543:20shu04bham11@cluster0.cswwbne.mongodb.net/newTodo?retryWrites=true&w=majority').on('open', ()=>{
    console.log("Mongodb connected");
}).on('error', () => {
    console.log("Connection error");
});

module.exports = connection;