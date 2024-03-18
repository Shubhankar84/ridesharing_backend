const db = require('../configuration/db');
const mongoose = require('mongoose');
const userModel = require('../model/user_Model');

const { Schema } = mongoose;


const todoSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: userModel.modelName
    },
    title: {
        type: String,
        required: true,
    },
    desc:{
        type: String, 
        required:true,
    },


});

const todoModel = db.model('todo', todoSchema);

module.exports = todoModel
