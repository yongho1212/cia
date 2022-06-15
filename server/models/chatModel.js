const mongoose = require('mongoose')


const chatSchema = new mongoose.Schema({

    aduid:{
        type: String,
    },
    infuid:{
        type: String,
    },
    prdname:{
        type: String,
    },
    prdfsid:{
        type: String,
    },
    channelid:{
        type: String,
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model("Chats", chatSchema)