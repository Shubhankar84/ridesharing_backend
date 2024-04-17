const router = require('express').Router();
const { addUserDetails, updateCarDetails, updatePersonalDetails, checkPersonalDetails, getCarDetails, getUserDetails } = require('../controller/userDetailsController')


// router.post('/addUserDetails', addUserDetails);
router.post('/updateCarDetails', updateCarDetails);
router.post('/updatePersonalDetails', updatePersonalDetails);
router.post('/checkPersonalDetails', checkPersonalDetails)
router.post('/getCarDetails', getCarDetails)
router.post('/getUserDetails', getUserDetails)

module.exports = router;