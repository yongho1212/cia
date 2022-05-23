const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')

router.post('/upload', productCtrl.upload)

router.post('/getlist', productCtrl.getlist)

router.get('/getlistbyid', productCtrl.getListById)

router.post('/appliyCampaign', productCtrl.appliyCampaign)

module.exports = router