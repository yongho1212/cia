const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')

router.post('/upload', productCtrl.upload)

module.exports = router