const userDetailsModel = require('../model/user_details')

exports.addUserDetails = async (req, res, next) => {
    try {
        const newUserDetails = await userDetailsModel.create(req.body);
        // const {email, password} = req.body;
        // const successRes = await UserService.registerUser(email, password);
        if (newUserDetails) {
            res.json({ status: true, success: "User Details added successfully" });
        } else {
            res.json({ status: false, success: "User Details not added" });
        }
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ status: false, error: "User is registered already" });
        } else {
            next(error);
        }
    }
}

exports.updateCarDetails = async (req, res, next) => {
    try {
        const getUserDetails = await userDetailsModel.findOne({ userId: req?.body?.userId }).lean();
        console.log("Get User Details", getUserDetails);
        // Current car details
        const { carDetails } = getUserDetails;
        // New car details
        const newCar = req?.body?.carDetails[0];
        carDetails.push(newCar)
        console.log(carDetails, newCar);
        const updatedDetails = await userDetailsModel.updateOne({ userId: req?.body?.userId }, { $set: { carDetails: carDetails } });
        console.log(updatedDetails);
        res.json({ status: true, success: "User Details updated successfully", data: updatedDetails });
    } catch (error) {
        console.log(error);
    }
}

exports.getCarDetails = async (req, res, next) => {
    try{
        
        const getUserDetails = await userDetailsModel.findOne({ userId: req?.body?.userId }).lean();
        console.log("Get User Details", getUserDetails);
        // Current car details
        const { carDetails } = getUserDetails;
        console.log(carDetails);
        res.json({status:true, success:"Cars available", data: carDetails});

    }catch(error){
        console.log(error);
    }
}

exports.checkPersonalDetails = async (req, res, next) => {
    try {
        const getUser = await userDetailsModel.findOne({ userId: req?.body?.userId }).lean();
        if (getUser != null) {
            res.json({ status: true, success: "User Details Present", userDetails: getUser });
        } else {
            res.json({ status: false, success: "User Details Not Present" });
        }
    } catch (error) {
        console.log(error);
    }
}


exports.getUserDetails = async(req, res, next) => {
    try{
        
        const getUserDetails = await userDetailsModel.findOne({ userId: req?.body?.userId }).lean();
        console.log("Get User Details", getUserDetails);
        // Current car details
        // const { carDetails } = getUserDetails;
        // console.log(getUserDetails);
        res.json({status:true, success:"UserDetails available", data: getUserDetails});

    }catch(error){
        console.log(error);
    }
}

exports.updatePersonalDetails = async (req, res, next) => {
    try {
        const getUserDetails = await userDetailsModel.findOne({ userId: req?.body?.userId }).lean();
        console.log("log of getuserDetails",getUserDetails);

        if (getUserDetails != null) {
            // Current car details
            const { personalInformation } = getUserDetails;
            // New car details
            const newInfo = req?.body?.personalInformation;
            // carDetails.push(newCar)
            console.log("Current User Details Here: ", personalInformation);
            console.log("Updated User Details Here: ", newInfo);
            const updatedDetails = await userDetailsModel.updateOne({ userId: req?.body?.userId }, { $set: { personalInformation: newInfo } });
            console.log(updatedDetails);
            res.json({ status: true, success: "User Details updated successfully", data: updatedDetails });
        } else {
            try {
                const newUserDetails = await userDetailsModel.create(req.body);
                // const {email, password} = req.body;
                // const successRes = await UserService.registerUser(email, password);
                if (newUserDetails) {
                    res.json({ status: true, success: "User Details added successfully" });
                } else {
                    res.json({ status: false, success: "User Details not added" });
                }
            } catch (error) {
                if (error.code === 11000) {
                    res.status(400).json({ status: false, error: "User is registered already" });
                } else {
                    next(error);
                }
            }
        }

    } catch (error) {
        console.log(error);
    }
}
