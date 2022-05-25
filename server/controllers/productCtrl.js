const Product = require("../models/newProductModel")

const fetch = require('node-fetch')
const {CLIENT_URL} = process.env

const productCtrl = {
    upload: async (req, res) => {
        try {
            const {name, brand, targetPlatform, category, period, postType,
                point, applicationConditions, qualification, isCheck,
                detailPage, offersAndMissions, photo, mobile, authorUid, authorEmail} = req.body

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
                mobile,
                authorUid,
                authorEmail
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
    },
    getListById: async (req, res) => {
        try {
            const {uid} = req.query
            const post = await Product.find({authorUid: uid});
            res.send(post)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    appliyCampaign: async (req, res) => {
        console.log(req);
        try {
            const {uid, id} = req.body;
            await Product.findOneAndUpdate({_id: id}, {$addToSet: {applicant: uid}})
            res.json({msg: "Push Success!"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    acceptApplicant: async (req, res) => {
        console.log(req);
        try {
            const {applicant_id, id} = req.body;
            await Product.findOneAndUpdate({_id: id}, {$addToSet: {joinInf: applicant_id}})
            await Product.findOneAndUpdate({_id: id}, {$pull: {applicant: applicant_id}})
            res.json({msg: "Push Success!"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    declineApplicant: async (req, res) => {
        console.log(req);
        try {
            const {applicant_id, id} = req.body;
            await Product.findOneAndUpdate({_id: id}, {$pull: {applicant: applicant_id}})
            res.json({msg: "Pull Success!"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    updatePrd: async (req, res) => {
        try {
            // const uid = req.body.uid
            console.log("mongodb is connected fuck");
            const { 
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
                mobile,
                authorUid,
                authorEmail
            } = req.body
            await Product.findOneAndUpdate({authorUid: uid}, {$set: {
                name: name, 
                brand: brand, 
                targetPlatform: targetPlatform, 
                category: category, 
                period: period, 
                postType: postType, 
                point: point, 
                applicationConditions: applicationConditions,
                qualification: qualification,
                isCheck: isCheck,
                detailPage: detailPage,
                offersAndMissions: offersAndMissions,
                photo: photo,
                mobile: mobile,
                authorEmail: authorEmail
            }})
            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = productCtrl