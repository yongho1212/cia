const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')

router.post('/upload', productCtrl.upload)

router.post('/getlist', productCtrl.getlist)

router.post('/getprdinfo', productCtrl.getPrdInfo)

router.get('/getlistbyid', productCtrl.getListById)

router.post('/appliyCampaign', productCtrl.appliyCampaign)

router.post('/findApplicant', productCtrl.findApplicant)

router.post('/acceptApplicant', productCtrl.acceptApplicant)

router.post('/declineApplicant', productCtrl.declineApplicant)

router.post('/deleteProduct', productCtrl.deletePrd)

module.exports = router