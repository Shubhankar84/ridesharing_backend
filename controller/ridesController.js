const RideServices = require("../services/rideServices");

exports.createRide = async (req, res, next) => {
    try {
        const { userId, source, dest, srcAdd, destAdd, srcTime, destTime, date, seats, price } = req.body;
        let ride = await RideServices.createRide(userId, source, dest, srcAdd, destAdd, srcTime, destTime, date, seats, price);

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