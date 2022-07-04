const router = require('express').Router()
const adCtrl = require('../controllers/adCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/ad_register', adCtrl.ad_register)

router.get('/getAdInfo', adCtrl.getAdInfo)

router.post('/ad_add_prd', adCtrl.addPrdAD)

router.post('/ad_add_channel', adCtrl.addChatChannelAD)

router.post('/ad_update_profile', adCtrl.ad_update_profile)

router.post('/deleteAdUser', adCtrl.deleteAdUser)




module.exports = router
