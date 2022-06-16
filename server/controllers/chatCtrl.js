const Chats = require("../models/chatModel")

const fetch = require('node-fetch')

const {CLIENT_URL} = process.env

const chatCtrl = {

    addchat: async (req, res) => {
        try {
            const {aduid, infuid, prdname, prdfsid, channelid} = req.body

            const newChat = new Chats({
                aduid, infuid, prdname, prdfsid, channelid
            })
            
            await newChat.save()

            res.json({msg: "new chat is uploaded!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getchat: async (req, res) => {
        try {
            const {channelid} = req.query
            const post = await Chats.find({channelid: channelid});
            res.send(post)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getChatById: async (req, res) => {
        try {
            const {channelid} = req.body
            const prdinfo = await Chats.findOne({channelid: channelid}).exec()
            res.send(chatinfo);
            console.log(chatinfo);
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

   
}

module.exports = chatCtrl