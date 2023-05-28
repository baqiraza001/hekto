const express = require("express");
const Configuration = require("../models/Configuration");
const { verifyUser } = require("../milddlewares/auth");
const { isSuperAdmin, isAdmin } = require("../utils/util");
const multer = require("multer")
const fs = require('fs').promises;
const path = require("path")
const fse = require('fs-extra');
const User = require("../models/User");
const Category = require("../models/Category");
const Brand= require("../models/Brand");
const Product = require("../models/Product");


const router = express.Router();
// router.use(verifyUser)

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            await fs.mkdir(`content/configuration`, { recursive: true });
            cb(null, `content/configuration/`)
        } catch (err) {
            cb(err, null)
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['jpg', "gif", "png", "bmp", 'jpeg']
        const ext = path.extname(file.originalname).replace(".", "")
        if (allowedTypes.includes(ext)) {
            cb(null, true)
        }
        else {
            cb((new Error("File is Not Allowed")), false)
        }
    }
})


// Adding Configuration
router.post("/add", async (req, res) => {
    const {
        siteName,
        tagline,
        logo,
        address,
        email,
        phoneNumber,
        facebookLink,
        twitterLink,
        instagramLink

    } = req.body;
    try {

        const site = new Configuration({
            siteName,
            tagline,
            logo,
            address,
            email,
            phoneNumber,
            facebookLink,
            twitterLink,
            instagramLink
        })
        await site.save()
        res.status(200).json({ site })
    } catch (error) {
        res.status(400).json([error.message]);
    }
});


// Editing Configuration
router.post(
    "/update",
    upload.single("logo"),
    async (req, res
    ) => {
        try {
            const [site] = await Configuration.find();
            if (!site)
                throw new Error("Invalid Id");

            const record = {
                siteName: req.body.siteName,
                tagline: req.body.tagline,
                address: req.body.address,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                facebookLink: req.body.facebookLink,
                twitterLink: req.body.twitterLink,
                instagramLink: req.body.instagramLink
            }
            if (req.file && req.file.filename) {
                record.logo = req.file.filename

                if (site.logo && site.logo !== req.file.filename) {
                    const oldPicPath = `content/configuration/${site.logo}`
                    if (fse.existsSync(oldPicPath))
                        await fs.unlink(oldPicPath)
                }
            }

            let updatedConfiguration = await Configuration.findOneAndUpdate(site._id, record)
            res.json(await Configuration.findOne() )

        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })



router.get("/", async (req, res) => {
    try {
        const configuration = await Configuration.findOne();

        const totalUsers = await User.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalBrands = await Brand.countDocuments();
        const totalProducts = await Product.countDocuments();
        
        res.status(200).json({configuration, totalUsers, totalCategories, totalBrands, totalProducts});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;