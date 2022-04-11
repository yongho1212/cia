const Product = require("../models/productModel")

const fetch = require('node-fetch')
const {CLIENT_URL} = process.env

const productCtrl = {
    upload: async (req, res) => {
        try {
            const {name, brand, date, point, mobile} = req.body

            const newProduct = new Product({
                name,
                brand,
                date,
                point,
                mobile
            })
            
            await newProduct.save()

            res.json({msg: "new product is uploaded!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = productCtrl