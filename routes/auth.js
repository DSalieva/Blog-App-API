const authCtrl = require('../controllers/auth')
const router = require('express').Router()
const {protect} = require('../middlewares/auth')

router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)
router.all('/logout', protect, authCtrl.logout)
router.put('/details', protect, authCtrl.updateDetails)
router.put('/password', protect, authCtrl.updatePassword)

module.exports =router; 