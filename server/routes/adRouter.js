const router = require('express').Router()
const adCtrl = require('../controllers/adCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/ad_register', adCtrl.ad_register)

router.get('/getAdInfo', adCtrl.getAdInfo)



module.exports = router