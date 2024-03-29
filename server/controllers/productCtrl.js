const Product = require("../models/newProductModel")

const fetch = require('node-fetch')
const {CLIENT_URL} = process.env

const productCtrl = {
    upload: async (req, res) => {
        try {
            const {name, brand, targetPlatform, category, period, postType,
                point, applicationConditions, qualification, isCheck,
                detailPage, offersAndMissions, photo, subimage, mobile,authorEmail, authorUid, prdfsidDb} = req.body

            const newProduct = new Product({
                name, brand, targetPlatform, category, period, postType,
                    point, applicationConditions, qualification, isCheck,
                    detailPage, offersAndMissions, photo, subimage, mobile, authorEmail, authorUid, prdfsidDb
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
    getPrdInfo: async (req, res) => {
        try {
            const {id} = req.body
            const prdinfo = await Product.findOne({_id: id}).exec()
            res.send(prdinfo);
            console.log(prdinfo);
             
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    appliyCampaign: async (req, res) => {
        console.log(req);
        try {
            const {uid, id} = req.body;
            const applicant = uid;
            await Product.findOneAndUpdate({_id: id}, {$addToSet: {applicant: uid}})
            res.json({msg: "Push Success!"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    findApplicant: async (req, res) => {
        console.log(req);
        const {uid, id} = req.body;
        try {
            const checker = await Product.find({_id: id},{applicant: uid})
            if(checker) {
                return res.json(true)
            } else {
                return res.json(false)
            }
            
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
    deletePrd: async (req, res) => {
        try {
            const {prdfsidDb} = req.body
            await Product.findOneAndDelete({prdfsidDb: prdfsidDb})

            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
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
                subimage,
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
                subimage: subimage,
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