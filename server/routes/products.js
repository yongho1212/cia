const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')

router.post('/upload', productCtrl.upload)

router.post('/getlist', productCtrl.getlist)

module.exports = router