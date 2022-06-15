const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.post('/forgot', userCtrl.forgotPassword)

router.post('/reset', auth, userCtrl.resetPassword)

router.get('/getUserInfo', userCtrl.getUserInfo)

router.get('/all_infor',  userCtrl.getUsersAllInfor)

router.get('/logout', userCtrl.logout)

router.post('/update', userCtrl.updateUser)

router.post('/addchannelad', userCtrl.addChatChannelAD)

router.post('/addchannelinf', userCtrl.addChatChannelINF)

router.post('/addprdad', userCtrl.addPrdAD)

router.post('/addprdinf', userCtrl.addPrdINF)

router.patch('/aboutme', auth, userCtrl.aboutMe)

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)

router.post('/getlist', userCtrl.getlist)

module.exports = router
