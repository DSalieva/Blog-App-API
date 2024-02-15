const router = require('express').Router();

// router /api/auth
router.use('/auth', require('./auth'))
//router /api/users
router.unsubscribe('/users', require('./users'))

module.exports = router 

