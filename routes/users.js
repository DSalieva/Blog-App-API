const router = require('express').Router();
const ctrl = require('../controllers/users');
const {authorize, protect}  = require('../middlewares/auth')

router.use(protect)
router.use(authorize('admin'))


router.route('/').get(ctrl.list).post(ctrl.create)

router.route('/:id').get(ctrl.read).put(ctrl.update).delete(ctrl.delete)


module.exports = router;