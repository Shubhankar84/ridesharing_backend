const RideModel = require('../model/rides_model');
const UserDetails = require('../model/user_details');
const geolib = require('geolib');


class RideServices {
    static async createRide(userId, source, dest, srcAdd, destAdd, srcTime, destTime, date, carName, carNo, seats, price) {
        const createRide = new RideModel({ userId, source, dest, srcAdd, destAdd, srcTime, destTime, date, carName, carNo, seats, price });
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

    //************************************************************************** */
    // static async getRides(source, dest, date) {
    //     // const rideData = await RideModel.find({source, dest, date}).populate('userId').select('-password');
    //     const rideData = await RideModel.find({ source, dest, date });

    //     // rideData.forEach(async ride => {
    //     //     const userData = await UserDetails.find({ userId: ride.userId });
    //     //     console.log("UserData: ", userData);
    //     //     ride.personalInformation = userData.personalInformation
    //     // });

    //     // console.log(rideData);

    //     // Extract rideIds from rideData
    //     const rideIds = rideData.map(ride => ride._id);

    //     // Aggregate to efficiently fetch userDetails for the filtered rideData
    //     const rides = await RideModel.aggregate([
    //         {
    //             $match: { _id: { $in: rideIds } } // Match the rideIds
    //         },
    //         {
    //             $lookup: {
    //                 from: UserDetails.collection.name, // userDetails collection name
    //                 localField: 'userId', // Field from RideModel
    //                 foreignField: 'userId', // Field from userDetailsModel
    //                 as: 'userDetails' // Alias for the joined userDetails data
    //             }
    //         }
    //     ]);

    //     // Now, rides contains the fetched records from RideModel with populated userDetails for the filtered rideData
    //     console.log(rides);
    /******************************************************************************** */



    static async getRides(source, dest, date) {
        try {
            // Calculate the bounding box coordinates for the given source and destination within 50km radius
            const sourceBoundingBox = geolib.getBoundsOfDistance({ latitude: source[0], longitude: source[1] }, 50000);
            const destBoundingBox = geolib.getBoundsOfDistance({ latitude: dest[0], longitude: dest[1] }, 50000);
    
            // Find rides within the bounding box of source coordinates
            const ridesWithinSource = await RideModel.find({
                source: {
                    $geoWithin: {
                        $box: [[sourceBoundingBox[0].latitude, sourceBoundingBox[0].longitude], [sourceBoundingBox[1].latitude, sourceBoundingBox[1].longitude]]
                    }
                },
                date: date
            });
    
            // Find rides within the bounding box of destination coordinates
            const ridesWithinDest = await RideModel.find({
                dest: {
                    $geoWithin: {
                        $box: [[destBoundingBox[0].latitude, destBoundingBox[0].longitude], [destBoundingBox[1].latitude, destBoundingBox[1].longitude]]
                    }
                },
                date: date
            });
    
            // Find rides where both source and destination are within 50km radius
            const ridesWithin50km = ridesWithinSource.filter(rideSource => {
                return ridesWithinDest.some(rideDest => rideDest._id.equals(rideSource._id));
            });
    
            // Extract rideIds from ridesWithin50km
            const rideIds = ridesWithin50km.map(ride => ride._id);
    
            // Aggregate to efficiently fetch userDetails for the filtered rideData
            const rides = await RideModel.aggregate([
                {
                    $match: { _id: { $in: rideIds } } // Match the rideIds
                },
                {
                    $lookup: {
                        from: UserDetails.collection.name, // userDetails collection name
                        localField: 'userId', // Field from RideModel
                        foreignField: 'userId', // Field from userDetailsModel
                        as: 'userDetails' // Alias for the joined userDetails data
                    }
                }
            ]);
    
            // Now, rides contains the fetched records from RideModel with populated userDetails for the filtered rideData
            console.log(rides);
            return rides;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching rides");
        }
    }
    



    //     // // Map userIds from rideData
    //     // const userIds = rideData.map(ride => ride.userId);

    //     // // Fetch personalInformation for all userIds
    //     // const userDetails = await UserDetails.find({ userId: { $in: userIds } });
    //     // console.log(userDetails);
    //     // // Map userIds to corresponding personalInformation
    //     // const userIdToPersonalInformation = {};
    //     // userDetails.forEach(user => {
    //     //     userIdToPersonalInformation[user.userId.toString()] = user.personalInformation;
    //     // });
    //     // console.log('------------------------------');
    //     // console.log(userIdToPersonalInformation);
    //     // console.log('------------------------------');

    //     // // Populate personalInformation inside rideData
    //     // console.log("Keys in userIdToPersonalInformation:", Object.keys(userIdToPersonalInformation));
    //     // rideData.forEach(ride => {
    //     //     console.log("ride.userId.toString():", ride.userId.toString());
    //     //     ride.personalInformation = userIdToPersonalInformation[ride.userId.toString()];
    //     // });

    //     // console.log(rideData);


    //     return rides;
    // }

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