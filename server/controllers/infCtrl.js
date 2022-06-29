
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
            const user = await Inf.findOne({email})
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

    inf_update_profile: async (req, res) => {
        try {
            // const uid = req.body.uid
            console.log("mongodb is connected fuck");
            const { uid, nickname, tags,  sex, birthday, insta, mobile, avatar} = req.body
            await Inf.findOneAndUpdate({uid: uid}, {$set: {
                nickname: nickname, tags: tags,  sex: sex, birthday: birthday, insta: insta, mobile: mobile, avatar: avatar
            }})
            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    
    getInfInfo: async (req, res) => {
        try {
            const {uid} = req.query
            const inf = await Inf.findOne({ uid: uid}).select('-password').exec()
            res.send(inf);
            console.log(inf);
             
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Inf.find().select('-password')

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
            await Inf.findOneAndUpdate({uid: uid}, {$set: {
                name: name, tags: tags, age: age, sex: sex, date: date, insta: insta, mobile: mobile, avatar: avatar
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
            const { applicant_id, joined_channel } = req.body
            await Inf.findOneAndUpdate({uid: applicant_id}, {$push: {
                joined_channel: joined_channel
            }})
            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    rejectINF: async (req, res) => {
        try {
            // const uid = req.body.uid
            console.log("mongodb is connected fuck");
            const { applicant_id, denied_prd } = req.body
            await Inf.findOneAndUpdate({uid: applicant_id}, {$push: {
                denied_prd: denied_prd
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
            const { applicant_id, progress_prd } = req.body
            await Inf.findOneAndUpdate({uid: applicant_id}, {$push: {
                progress_prd: progress_prd
            }})
            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    deleteUser: async (req, res) => {
        try {
            const {uid} = req.body
            await Inf.findOneAndDelete({uid: uid})

            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    aboutMe: async (req, res) => {
        try {
            const {about} = req.body


            await Inf.findOneAndUpdate({_id: req.user.id}, {
                about
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
   

}


module.exports = infCtrl
