const mongoose = require('mongoose')


const adSchema = new mongoose.Schema({
    uid:{
        type: String,
        unique: true
    },
    brand_name: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    about: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    tags: {
        type: Array,
    },
    role:{
        type: String,
        default: 'advertiser'
    },
    logo: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    insta: {
        type: String,
        default: '@instagram'
    },
    facebook: {
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
    website: {
        type: String,
        default: 'www.000.com'
    },
    mobile: {
        type: String,
        default: '010-0000-0000'
    },
    location:{
        type: String,
        default: '서울특별시'
    },
    business_registration_number:{
        type: String,
        default: '000-00-00000'
    },
    business_registration_scan:{
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    progress_prd:{
        type: Array
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

module.exports = mongoose.model("Ad", adSchema)