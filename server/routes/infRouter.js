const router = require('express').Router()
const infCtrl = require('../controllers/infCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/inf_register', infCtrl.inf_register)

router.get('/getInfInfo', infCtrl.getInfInfo)



module.exports = router
