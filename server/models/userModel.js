const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    uid:{
        type: String,
        unique: true
    },
    displayName: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    tags: {
        type: String,
        default: 'tags'
    },
    role:{
        type: String,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    age: {
        type: Number,
        default: 20
    },
    sex: {
        type: String,
        default: 'male'
    },
    date: {
        type: String,
        default: '2022-05-09'
    },
    insta: {
        type: String,
        default: 'yongho1212'
    },
    mobile: {
        type: String,
        default: '010-0000-0000'
    },
    joinedPrd:{
        type: Array
    },
    joinedChannel: {
        type: Array
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)