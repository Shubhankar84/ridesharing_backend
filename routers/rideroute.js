const router = require('express').Router();
const RideController = require('../controller/ridesController');

router.post('/createride', RideController.createRide);
router.post('/searchride', RideController.getRides);


module.exports = router;