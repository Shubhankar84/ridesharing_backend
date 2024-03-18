const RideModel = require('../model/rides_model');
const UserDetails = require('../model/user_details');

class RideServices {
    static async createRide(userId, source, dest, srcAdd, destAdd, srcTime, destTime, date, seats, price) {
        const createRide = new RideModel({ userId, source, dest, srcAdd, destAdd, srcTime, destTime, date, seats, price });
        return await createRide.save();
    }

    // static async getRides(source, dest, date) {
    //     // const rideData = await RideModel.find({source, dest, date}).populate('userId').select('-password');
    //     const rideData = await RideModel.find({ source, dest, date })
    //         .populate({
    //             path: 'userId',
    //             select: 'email -_id' // Select only the 'email' field and exclude the '_id' field from the populated 'userId' document
    //         })
    //         .select('-password');
    //     return rideData;
    // }

    static async getRides(source, dest, date) {
        // const rideData = await RideModel.find({source, dest, date}).populate('userId').select('-password');
        const rideData = await RideModel.find({ source, dest, date });

        // rideData.forEach(async ride => {
        //     const userData = await UserDetails.find({ userId: ride.userId });
        //     console.log("UserData: ", userData);
        //     ride.personalInformation = userData.personalInformation
        // });
        
        // console.log(rideData);

        // Map userIds from rideData
        const userIds = rideData.map(ride => ride.userId);

        // Fetch personalInformation for all userIds
        const userDetails = await UserDetails.find({ userId: { $in: userIds } });
        console.log(userDetails);
        // Map userIds to corresponding personalInformation
        const userIdToPersonalInformation = {};
        userDetails.forEach(user => {
            userIdToPersonalInformation[user.userId.toString()] = user.personalInformation;
        });
        console.log('------------------------------');
        console.log(userIdToPersonalInformation);
        console.log('------------------------------');

        // Populate personalInformation inside rideData
        console.log("Keys in userIdToPersonalInformation:", Object.keys(userIdToPersonalInformation));
        rideData.forEach(ride => {
            console.log("ride.userId.toString():", ride.userId.toString());
            ride.personalInformation = userIdToPersonalInformation[ride.userId.toString()];
        });

        console.log(rideData);

        
        return rideData;
    }

    // static async getRides(source, dest, date) {
    //     const rideData = await RideModel.find({ source, dest, date })
    //         .populate({
    //             path: 'userId', // Populate the 'userId' field in UserDetailsModel
    //             select: '-_id', // Exclude the '_id' field from the populated document
    //             populate: {
    //                 path: 'personalInformation', // Populate the 'personalInformation' field within 'userId'
    //                 model: 'UserModel', // Reference the UserModel
    //                 select: '-_id -email -password' // Exclude fields you don't need from UserModel
    //             }
    //         });
    //     return rideData;
    // }


}

module.exports = RideServices;