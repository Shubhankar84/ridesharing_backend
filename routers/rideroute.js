const router = require('express').Router();
const RideController = require('../controller/ridesController');

router.post('/createride', RideController.createRide);

// search for a rides
router.post('/searchride', RideController.getRides);

// user request karega ride to book karne ke liey
router.post('/requestride', RideController.requestrides);

// user ko request display honge uske rides ke jo usne publish kiye hai so that he can approve or decline
router.post('/getridesrequest', RideController.getridesrequest);

// user aaye huve request ko confirm karega or approve karega
router.post('/confirmride', RideController.confirmride);

// to see user the rides that are booked by him
router.post('/getbookedrides', RideController.getbookedrides)

// to see user the rides that are published by him
router.post('/getpublishedrides', RideController.getpublishedrides)

router.post('/verify', RideController.verify)


module.exports = router;