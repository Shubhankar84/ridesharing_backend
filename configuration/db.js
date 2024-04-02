const mongoose = require('mongoose');
const dotenv = require("dotenv");
// dotenv.config({ path: ".env" });
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URI;
console.log(MONGODB_URL)
const connection = mongoose.createConnection(MONGODB_URL).on('open', ()=>{
    console.log("Mongodb connected");
}).on('error', () => {
    console.log("Connection error");
});

// const connection = mongoose.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("error", (err) => {
//     console.error(`MongoDB connection error: ${err}`);
// });

// db.once("open", () => {
//     console.log("Connected to MongoDB");
// });

module.exports = connection;