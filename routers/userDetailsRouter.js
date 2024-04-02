const router = require('express').Router();
const { addUserDetails, updateCarDetails, updatePersonalDetails, checkPersonalDetails, getCarDetails } = require('../controller/userDetailsController')


// router.post('/addUserDetails', addUserDetails);
router.post('/updateCarDetails', updateCarDetails);
router.post('/updatePersonalDetails', updatePersonalDetails);
router.post('/checkPersonalDetails', checkPersonalDetails)
router.post('/getCarDetails', getCarDetails)

module.exports = router;