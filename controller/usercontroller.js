const UserService = require('../services/userservices');

exports.register = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const successRes = await UserService.registerUser(email, password);
        
        res.json({status:true, success:"User Registered successfully"});
        console.log(`User registered in with ${email} `)

    } catch (error) {
        if(error.code === 11000){
            res.status(400).json({status:false, error: "User is registered already"});
        } else{
            next(error);
        }
    }
}

exports.login = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        console.log(email);
        console.log(password);
        const user = await UserService.checkUser(email);

        if(!user){
            console.log("not a user")
            return res.status(401).send({status:false, error:"Username and password does not match"});
        }
        
        const isMatch = await user.comparePassword(password);
        if(isMatch==false){
            console.log("user name and password dosent match")
            return res.status(401).send({status:false, error:"Username and password does not match"});
        }

        let tokenData ={_id:user._id, email:user.email};

        const token = await UserService.generateToken(tokenData, "34567", "1h");

        res.status(200).json({status:true, token:token})
        console.log(`User logged in with ${email} `)


    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error: "Internal server error" });
    }
}