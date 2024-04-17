const mongoose = require('mongoose');
const RideServices = require("../services/rideServices");
const RideModel = require('../model/rides_model');
const UserDetails = require('../model/user_details');



exports.createRide = async (req, res, next) => {
    try {
        const { userId, source, dest, srcAdd, destAdd, srcTime, destTime, date, carName, carNo, seats, price } = req.body;
        let ride = await RideServices.createRide(userId, source, dest, srcAdd, destAdd, srcTime, destTime, date, carName, carNo, seats, price);

        res.json({ status: true, success: ride });
    } catch (error) {
        next(error);
    }
}

exports.getRides = async (req, res, next) => {
    try {
        const { source, dest, date } = req.body;
        let rides = await RideServices.getRides(source, dest, date);

        res.json({ status: true, success: rides });
    } catch (error) {
        next(error);
    }
}

exports.getpublishedrides = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // Find rides where userId matches
        publishedRides = await RideModel.find({ userId: userId });

        // If no rides are found, return empty array
        if (!publishedRides || publishedRides.length === 0) {
            return res.status(404).json({ message: "No published rides found" });
        }

        // Extract userIds from publishedRides
        const userIds = publishedRides.map(ride => ride.userId);

        // Use aggregation to efficiently fetch userDetails for the filtered rides
        publishedRides = await RideModel.aggregate([
            {
                $match: { userId: { $in: userIds } } // Match the userIds
            },
            {
                $lookup: {
                    from: UserDetails.collection.name, // userDetails collection name
                    localField: 'userId', // Field from RideModel
                    foreignField: 'userId', // Field from UserDetails model
                    as: 'userDetails' // Alias for the joined userDetails data
                }
            }
        ]);

        // Now, ridesWithUserDetails contains the fetched records from RideModel with populated userDetails for the filtered rides
        console.log(publishedRides);

        // Send the found rides with user details
        res.json({ status: true, publishedRides });

    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// exports.getpublishedrides = async (req, res, next) => {
//     try {
//         const { userId } = req.body;

//         // Find rides where userId matches
//         let publishedRides = await RideModel.find({ userId: userId });

//         // If no rides are found, return empty array
//         if (!publishedRides || publishedRides.length === 0) {
//             return res.status(404).json({ message: "No published rides found" });
//         }

//         // Extract userIds from publishedRides
//         const userIds = publishedRides.map(ride => ride.userId);

//         // Use aggregation to efficiently fetch userDetails for the filtered rides
//         publishedRides = await RideModel.aggregate([
//             {
//                 $match: { userId: { $in: userIds } } // Match the userIds
//             },
//             {
//                 $lookup: {
//                     from: UserDetails.collection.name, // userDetails collection name
//                     localField: 'userId', // Field from RideModel
//                     foreignField: 'userId', // Field from UserDetails model (should be email)
//                     as: 'userDetails' // Alias for the joined userDetails data
//                 }
//             },
//             {
//                 $addFields: {
//                     requestedBooking: {
//                         $map: {
//                             input: "$requestedBooking",
//                             as: "booking",
//                             in: {
//                                 $mergeObjects: [
//                                     "$$booking",
//                                     {
//                                         userDetails: {
//                                             $arrayElemAt: [
//                                                 {
//                                                     $filter: {
//                                                         input: "$userDetails",
//                                                         as: "user",
//                                                         cond: { $eq: ["$$user.userId", "$$booking.userId"] }
//                                                     }
//                                                 },
//                                                 0
//                                             ]
//                                         }
//                                     }
//                                 ]
//                             }
//                         }
//                     }
//                 }
//             },
//             {
//                 $addFields: {
//                     "requestedBooking.userDetails": {
//                         $map: {
//                             input: "$requestedBooking",
//                             as: "booking",
//                             in: {
//                                 $arrayElemAt: [
//                                     {
//                                         $filter: {
//                                             input: "$userDetails",
//                                             as: "user",
//                                             cond: { $eq: ["$$user.userId", "$$booking.userId"] }
//                                         }
//                                     },
//                                     0
//                                 ]
//                             }
//                         }
//                     }
//                 }
//             }
//         ]);

//         // Now, publishedRides contains the fetched records from RideModel with populated userDetails for the filtered rides
//         console.log(publishedRides);

//         // Send the found rides with user details
//         res.json({ status: true, publishedRides });

//     } catch (error) {
//         // Handle error
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }

// exports.getpublishedrides = async (req, res, next) => {
//     try {
//         const { userId } = req.body;

//         // Find rides where userId matches
//         let publishedRides = await RideModel.find({ userId: userId });

//         // Get details for each ride
//         for (const rideDetails of publishedRides) {
//             // Get all requested user details for each ride
//             const bookings = rideDetails.requestedBooking;

//             // for (let i = 0; i < bookings.length; i++) {
//             //     // const booking = bookings[i];
//             //     console.log(bookings[i]);
//             //     const userData = await UserDetails.findOne({ userId: bookings[i].userId });
//             //     bookings[i] = {
//             //         // data: bookings[i],
//             //         ...userData.personalInformation
//             //     }
                
//             //     console.log(bookings[i]);
//             // }
//             const updatedBookings = []
//             for (let booking of bookings) {
//                 // console.log(userData);
//                 const userData = await UserDetails.findOne({ userId: booking.userId });
//                 // booking.userId = userData.personalInformation
//                 // booking.userId = { ...userData.personalInformation };
//                 booking.firstName = userData?.personalInformation?.firstName
//                 console.log(booking);
//                 console.log('------------OLD---------------');
//                 const newData = {
//                     ...booking._doc,
//                     ...userData?.personalInformation
//                 }
//                 updatedBookings.push(newData)
//                 booking = newData
//                 console.log(booking);
//                 console.log('---------------------------');
//                 console.log(newData);
//             }
//             rideDetails.requestedBooking = updatedBookings
//             console.log(rideDetails);
//         }

//         res.json({ status: true, publishedRides });
//     } catch (error) {
//         // Handle error
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }





exports.getbookedrides = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // Find rides where userId matches in requestedBooking
        bookedRides = await RideModel.find({ 'requestedBooking.userId': userId });

        // If no rides are found, return empty array
        if (!bookedRides || bookedRides.length === 0) {
            return res.status(404).json({ message: "No booked rides found" });
        }

        // Extract rideIds from bookedRides
        const rideIds = bookedRides.map(ride => ride._id);

        // Use aggregation to efficiently fetch userDetails for the filtered rides
        bookedRides = await RideModel.aggregate([
            {
                $match: { _id: { $in: rideIds } } // Match the rideIds
            },
            {
                $lookup: {
                    from: UserDetails.collection.name, // userDetails collection name
                    localField: 'userId', // Field from RideModel
                    foreignField: 'userId', // Field from UserDetails model
                    as: 'userDetails' // Alias for the joined userDetails data
                }
            }
        ]);

        // Now, ridesWithUserDetails contains the fetched records from RideModel with populated userDetails for the filtered rides
        console.log(bookedRides);

        // Send the found rides with user details
        res.json({ status: true, bookedRides });

    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}



exports.confirmride = async (req, res, next) => {
    try {
        const { _id, reqId, status } = req.body;

        // Find the ride by _id
        const ride = await RideModel.findOne({ _id });

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        // Convert reqId to ObjectId
        const requestedBookingId = new mongoose.Types.ObjectId(reqId);

        // Find the requested booking with the matching reqId
        const requestedBooking = ride.requestedBooking.find(booking => booking._id.equals(requestedBookingId));

        if (!requestedBooking) {
            return res.status(404).json({ message: "Requested booking not found" });
        }

        // Check if bookedSeats is less than or equal to seats
        if (ride.bookedSeats + requestedBooking.reqseats > ride.seats) {
            return res.status(400).json({ message: "Booking is full" });
        }

        // Update the status of the requested booking to "Approved"
        if (status == 0) {
            requestedBooking.status = "Declined";
            // Save the updated ride
            await ride.save();
            return res.json({ status: true, message: "Booking Declined" });

        }

        requestedBooking.status = "Approved";




        // Increment the booked seats
        ride.bookedSeats += requestedBooking.reqseats;

        // Save the updated ride
        await ride.save();

        // Send response
        res.json({ status: true, message: "Booking confirmed" });

    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}



exports.getridesrequest = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // Find rides with requestedBooking status as "Requested" for the given userId
        const ridesWithRequestedBooking = await RideModel.aggregate([
            {
                $match: {
                    "requestedBooking.userId": userId,
                    "requestedBooking.status": "Requested"
                }
            },
            {
                $project: {
                    userId: 1,
                    source: 1,
                    dest: 1,
                    srcAdd: 1,
                    destAdd: 1,
                    srcTime: 1,
                    destTime: 1,
                    date: 1,
                    carName: 1,
                    carNo: 1,
                    seats: 1,
                    bookedSeats: 1,
                    booking: 1,
                    requestedBooking: {
                        $filter: {
                            input: "$requestedBooking",
                            as: "booking",
                            cond: { $eq: ["$$booking.userId", userId] }
                        }
                    },
                    price: 1
                }
            }
        ]);

        // Return the rides with requestedBooking status as "Requested"
        res.json({ status: true, success: ridesWithRequestedBooking });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.requestrides = async (req, res, next) => {
    try {
        const { _id, userId, seats } = req.body;

        // Find the ride
        const rideData = await RideModel.findOne({ _id });

        if (!rideData) {
            return res.status(404).json({ message: "Ride not found" });
        }

        // Calculate total booked seats including the requested seats
        const totalBookedSeats = rideData.bookedSeats + seats;

        // If the total booked seats exceed the total available seats, respond with car is full
        if (totalBookedSeats > rideData.seats) {
            return res.status(400).json({ message: "Car is full" });
        }

        // If there are available seats, update requestedBooking and bookedSeats
        const updatedRideData = await RideModel.findOneAndUpdate(
            { _id },
            {
                $push: {
                    requestedBooking: {
                        userId: userId,
                        status: "Requested",
                        reqseats: seats // Include the requested seats
                    }
                },
                // $inc: { bookedSeats: seats } // Increment bookedSeats by the value of seats
            },
            { new: true }
        );

        console.log(updatedRideData);

        // Send response
        res.json({ status: true, success: updatedRideData });

    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

