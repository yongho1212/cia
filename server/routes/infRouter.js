const router = require('express').Router()
const infCtrl = require('../controllers/infCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/inf_register', infCtrl.inf_register)

router.get('/getInfInfo', infCtrl.getInfInfo)

router.post('/inf_add_prd', infCtrl.addPrdINF)

router.post('/inf_add_channel', infCtrl.addChatChannelINF)

router.post('/inf_update_profile', infCtrl.inf_update_profile)





module.exports = router
