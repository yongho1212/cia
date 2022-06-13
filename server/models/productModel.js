const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    brand: {
        type: String,
        required: [true, "Please enter your brand!"],
        trim: true,

    },
    date: {
        type: String,
        required: [true, "Please enter duedate"]
    },
    point: {
        type: String,
        required: [true, "Please enter the point"],
        default: "10000p"
    },
    mobile: {
        type: String,
        require: [true, "Please enter your mobile"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)