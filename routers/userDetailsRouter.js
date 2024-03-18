const router = require('express').Router();
const { addUserDetails, updateCarDetails, updatePersonalDetails, checkPersonalDetails } = require('../controller/userDetailsController')


// router.post('/addUserDetails', addUserDetails);
router.post('/updateCarDetails', updateCarDetails);
router.post('/updatePersonalDetails', updatePersonalDetails);
router.post('/checkPersonalDetails', checkPersonalDetails)

module.exports = router;