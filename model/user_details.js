const mongoose = require('mongoose');
const db = require('../configuration/db');
const bcrypt = require('bcrypt');
const userModel = require('../model/user_Model');

const { Schema } = mongoose;

const userDetails = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: userModel.modelName,
        unique: true
    },
    personalInformation: {

        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        age: {
            type: Number,
        },
        mobile: {
            type: String,
        },
        LiscenseNo: {
            type: String
        },
        aadharNo: String,
    },

    carDetails: [
        {
            carName: String,
            carNo: String,
            seats: Number,
        }
    ],

    publishedRides: [
        {
            
        }
    ]
});

const userDetailsModel = db.model('userDetails', userDetails);

module.exports = userDetailsModel