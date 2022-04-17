const Product = require("../models/newProductModel")

const fetch = require('node-fetch')
const {CLIENT_URL} = process.env

const productCtrl = {
    upload: async (req, res) => {
        try {
            const {name, brand, targetPlatform, category, period, postType,
                point, applicationConditions, qualification, isCheck,
                detailPage, offersAndMissions, photo, mobile} = req.body

            const newProduct = new Product({
                name,
                brand,
                targetPlatform,
                category,
                period,
                postType,
                point,
                applicationConditions,
                qualification,
                isCheck,
                detailPage,
                offersAndMissions,
                photo,
                mobile
            })
            
            await newProduct.save()

            res.json({msg: "new product is uploaded!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getlist: async (req, res) => {
        try {
            const post = await Product.find();
            res.send(post)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = productCtrl