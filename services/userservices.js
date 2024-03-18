const userModel = require('../model/user_Model')
const jwt = require('jsonwebtoken');

class UserService{
    static async registerUser(email, password){
        try {
            const createUser = new userModel({email, password});
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }

    static async checkUser(email){
        try {
            return await userModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    static async generateToken(tokenData, secreteKey, jwtexpire){
        return jwt.sign(tokenData,secreteKey,{expiresIn:jwtexpire});
    }
}

module.exports = UserService;