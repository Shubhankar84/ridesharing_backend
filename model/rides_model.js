const db = require('../configuration/db');
const mongoose = require('mongoose');
const userModel = require('../model/user_Model');

const { Schema } = mongoose;

const ridesSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: userModel.modelName
        // ref: 'user'
    },
    source:{
        type:[Number],
        required: true
    },
    dest:{
        type:[Number],
        required: true
    },
    srcAdd:{
        type:String,
        required: true
    },
    destAdd:{
        type: String,
        required: true
    },
    srcTime:{
        type: String,
        required:true,
    },
    destTime:{
        type:String,
        required: true
    },
    date:{
        type:String,
        required: true
    },
    seats:{
        type:Number,
        required: true
    },
    price:{
        type:Number,
        required: true
    }
});

const rideModel = db.model('rides', ridesSchema);

module.exports = rideModel