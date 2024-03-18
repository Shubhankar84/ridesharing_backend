const router = require('express').Router();
const { register, login } = require('../controller/usercontroller');

router.post('/registration', register);
router.post('/login', login);

module.exports = router;