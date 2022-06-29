const mongoose = require('mongoose')


const infSchema = new mongoose.Schema({
    uid:{
        type: String,
        unique: true
    },
    nickname: {
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
        type: Array,
    },
    about: {
        type: String,
    },
    role:{
        type: String,
        default: 'influencer'
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    sex: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    location:{
        type: String,
    },
    insta: {
        type: String,
        default: '@instagram'
    },
    facebook: {
        type: String,
        default: 'www.facebook.com'
    },
    tiktok: {
        type: String,
        default: 'www.facebook.com'
    },
    twitter: {
        type: String,
        default: 'www.twitter.com'
    },
    youtube: {
        type: String,
        default: 'www.youtube.com'
    },
    mobile: {
        type: String,
        default: '010-0000-0000'
    },
    wait_prd:{
        type: Array
    },
    denied_prd:{
        type: Array,
        required: [true, "You already!"]
    },
    progress_prd:{
        type: Array,
        required: [true, "You already"]
    },
    history_prd:{
        type: Array
    },
    joined_channel: {
        type: Array
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model("Inf", infSchema)