const mongoose = require('mongoose')


const newproductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    brand: {
        type: String,
        required: [true, "Please enter your brand!"],
    },
    targetPlatform: {
        type: String,
        required: [true, "Please enter duedate"]
    },
    category: {
        type: String,
        required: [true, "Please enter duedate"]
    },
    period: {
        type: String,
        required: [true, "Please enter duedate"]
    },
    postType: {
        type: String,
        required: [true, "Please enter duedate"]
    },
    point: {
        type: String,
        required: [true, "Please enter duedate"]
    },
    applicationConditions: {
        type: String,
        required: [true, "Please enter duedate"]
    },
    qualification: {
        type: String,
        required: [true, "Please enter duedate"]
    },
    isCheck: {
        type: String,
        required: [true, "Please enter duedate"]
    },
    detailPage: {
        type: String,
        required: [true, "Please enter duedate"]
    },
    offersAndMissions: {
        type: String,
        required: [true, "Please enter duedate"]
    },
    photo: {
        type: String || undefined,
        required: [true, "Please enter duedate"]
    },
    mobile: {
        type: String,
        require: [true, "Please enter your mobile"]
    },
    authorUid: {
        type: String,
    },
    applicant: {
        type: Array,
    },
    joinInf: {
        type: Array,
    },
    authorEmail:{
        type: Array,
    },
    prdfsidDb:{
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("newProduct", newproductSchema)