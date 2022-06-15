const router = require('express').Router()
const chatCtrl = require('../controllers/chatCtrl')

router.post('/addchat', chatCtrl.addchat)

router.get('/getchat', chatCtrl.getchat)

router.get('/getChatById', chatCtrl.getChatById)


module.exports = router
