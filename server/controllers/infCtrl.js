
const Inf = require('../models/infModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {CLIENT_URL} = process.env

const infCtrl = {

    inf_register: async (req, res) => {
        try {
            const {nickname, email, uid, password} = req.body

            const user = await Inf.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 8 || password.length > 20)
                return res.status(400).json({msg: "8자리 ~ 20자리 이내로 입력해주세요."})
            

            const passwordHash = await bcrypt.hash(password, 12)

            const newInf = new Inf({
                nickname, email, uid, password: passwordHash
            })
            
            await newInf.save()
            res.json({msg: "ad_registered"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await Ad.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    
    getInfInfo: async (req, res) => {
        try {
            const {uid} = req.query
            const ad = await Inf.findOne({ uid: uid}).select('-password').exec()
            res.send(ad);
            console.log(ad);
             
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Ad.find().select('-password')

            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    updateUser: async (req, res) => {
        try {
            // const uid = req.body.uid
            console.log("mongodb is connected fuck");
            const { uid, name, tags, age, sex, date, insta, mobile, avatar} = req.body
            await Ad.findOneAndUpdate({uid: uid}, {$set: {
                name: name, tags: tags, age: age, sex: sex, date: date, insta: insta, mobile: mobile, avatar: avatar
            }})
            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addChatChannelAD: async (req, res) => {
        try {
            // const uid = req.body.uid
            console.log("mongodb is connected fuck");
            const { uid, joinedChannel } = req.body
            await Ad.findOneAndUpdate({uid: uid}, {$push: {
                joinedChannel: joinedChannel
            }})
            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addChatChannelINF: async (req, res) => {
        try {
            // const uid = req.body.uid
            console.log("mongodb is connected fuck");
            const { applicant_id, joinedChannel } = req.body
            await Ad.findOneAndUpdate({uid: applicant_id}, {$push: {
                joinedChannel: joinedChannel
            }})
            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addPrdINF: async (req, res) => {
        try {
            // const uid = req.body.uid
            console.log("mongodb is connected fuck");
            const { applicant_id, joinedPrd } = req.body
            await Ad.findOneAndUpdate({uid: applicant_id}, {$push: {
                joinedPrd: joinedPrd
            }})
            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addPrdAD: async (req, res) => {
        try {
            // const uid = req.body.uid
            console.log("mongodb is connected fuck");
            const { uid, joinedPrd } = req.body
            await Ad.findOneAndUpdate({uid: uid}, {$push: {
                joinedPrd: joinedPrd
            }})
            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    deleteUser: async (req, res) => {
        try {
            const {uid} = req.body
            await Ad.findOneAndDelete({uid: uid})

            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    aboutMe: async (req, res) => {
        try {
            const {about} = req.body


            await Ad.findOneAndUpdate({_id: req.user.id}, {
                about
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
   

}


module.exports = infCtrl
