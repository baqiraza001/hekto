const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product")
const { isSuperAdmin, isAdmin } = require("../utils/util");
const { verifyUser } = require("../milddlewares/auth");
const multer = require('multer');
const fs = require('fs').promises;
const fse = require('fs-extra');
const path = require('path');
const Category = require("../models/Category");

const router = express.Router();
router.use(verifyUser)

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            cb(null, `content/products/`);
        } catch (err) {
            cb(err, null);
        }

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage,
});


// Adding product
router.post("/add", upload.array('productPictures[]'), async (req, res) => {

    const record = {
        name: req.body.name,
        shortDescription: req.body.shortDescription,
        price: req.body.price,
        sale_price: req.body.sale_price,
        discountPercentage: req.body.discountPercentage,
        categoryId: req.body.categoryId,
        brandId: req.body.brandId,
        color: req.body.color,
        isFeatured: req.body.isFeatured,
        isTrending: req.body.isTrending,
        isTop: req.body.isTop,
        tags: req.body.tags,
        longDescription: req.body.longDescription,
        additionalInformation: req.body.additionalInformation,
    }

    if (req.body.discountPercentage)
        record.discountPrice = (req.body.sale_price - (req.body.sale_price * (req.body.discountPercentage / 100))).toFixed(2);

    try {
        if (isSuperAdmin(req.user) && isAdmin(req.user))
            throw new Error("Invalid Requests")

        let product = new Product(record);

        await product.save()

        let productPicturesArr = [];
        if (req.files && req.files.length > 0) {
            // Move the uploaded files to the product folder
            await fs.mkdir(`content/products/${product._id}/`, { recursive: true });
            const movePromises = req.files.map((file) => {
                productPicturesArr.push(file.filename);

                const sourcePath = file.path;
                const targetPath = path.join(`content/products/${product._id}`, file.originalname);

                // Delete the existing file if it already exists
                if (fse.existsSync(targetPath)) {
                    fse.removeSync(targetPath);
                }
                return fse.move(sourcePath, targetPath);
            });
            await Promise.all(movePromises);

            await Product.findByIdAndUpdate(req.body.id, { productPictures: productPicturesArr });
        }

        const category = await Category.findOne({ _id: req.body.categoryId });
        product = {
            ...product.toObject(),
            categoryName: category.name
        };

        res.status(200).json({ product })
    } catch (error) {
        res.status(400).json([error.message]);
    }
});


// Editing Products
router.post("/edit", upload.array('productPictures[]'), async (req, res) => {

    try {
        if (isSuperAdmin(req.user) && isAdmin(req.user))
            throw new Error("Invalid Request")

        // if id is not available
        if (!req.body.id)
            throw new Error("Product id is requird")

        // check for valid object Id using mongoose this will check the id is this id is according to formula of #
        if (!mongoose.isValidObjectId(req.body.id))
            throw new Error("Invalid Id");

        let oldProductRecord = await Product.findById(req.body.id);

        const record = {
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            price: req.body.price,
            sale_price: req.body.sale_price,
            discountPercentage: req.body.discountPercentage,
            categoryId: req.body.categoryId,
            brandId: req.body.brandId,
            color: req.body.color,
            isFeatured: req.body.isFeatured,
            isTrending: req.body.isTrending,
            isTop: req.body.isTop,
            tags: req.body.tags,
            longDescription: req.body.longDescription,
            additionalInformation: req.body.additionalInformation,
        }
        if (req.body.discountPercentage)
            record.discountPrice = (req.body.sale_price - (req.body.sale_price * (req.body.discountPercentage / 100))).toFixed(2);

        let productPicturesArr = [];
        if (req.files && req.files.length > 0) {
            // Move the uploaded files to the product folder
            await fs.mkdir(`content/products/${req.body.id}/`, { recursive: true });
            const movePromises = req.files.map((file) => {
                productPicturesArr.push(file.filename);

                const sourcePath = file.path;
                const targetPath = path.join(`content/products/${req.body.id}`, file.originalname);

                // Delete the existing file if it already exists
                if (fse.existsSync(targetPath)) {
                    fse.removeSync(targetPath);
                }
                return fse.move(sourcePath, targetPath);
            });
            await Promise.all(movePromises);


            record.productPictures = productPicturesArr;
            for (let index = 0; index < oldProductRecord.productPictures.length; index++) {
                if (fse.existsSync(`content/products/${req.body.id}/${oldProductRecord.productPictures[index]}`))
                    fse.removeSync(`content/products/${req.body.id}/${oldProductRecord.productPictures[index]}`);
            }
        }

        await Product.findByIdAndUpdate(req.body.id, record);

        let updatedProduct = await Product.findById(req.body.id);
        const category = await Category.findOne({ _id: req.body.categoryId });


        const responseObj = {
            ...updatedProduct.toObject(),
            categoryName: category.name
        };

        res.json({ product: responseObj })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Deleting Products
router.delete('/delete', async (req, res) => {
    try {
        if (isSuperAdmin(req.user) && isAdmin(req.user))
            throw new Error("Invalid Request 1")

        //  if id is not available
        if (!req.body.id)
            throw new Error("Category id is requird")


        // check for valid object Id using mongoose this will check the id is this id is according to formula of #
        if (!mongoose.isValidObjectId(req.body.id))
            throw new Error("Invalid Id 2");


        // check for the valid id
        const product = await Product.findById(req.body.id)
        if (!product)
            throw new Error("Invalid Id 3");

        await Product.findByIdAndDelete(req.body.id)
        res.json({ success: "Product is Deleted" })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})



//Getting Products
router.get("/", async (req, res) => {
    try {
        if (isSuperAdmin(req.user) && isAdmin(req.user))
            throw new Error("Invalid Request")

        const skip = parseInt(req.query.skip ? req.query.skip : 0);
        const recordsPerPage = req.query.limit ? req.query.limit : process.env.RECORDS_PER_PAGE;

        const pipeline = [
            {
                $lookup: {
                    from: "categories", // Name of the category collection
                    localField: "categoryId", // Field in the products collection
                    foreignField: "_id", // Field in the category collection
                    as: "category" // Output field name for the joined category
                }
            },
            {
                $unwind: "$category" // Unwind the category array created by $lookup
            },
            {
                $skip: skip
            },
            {
                $limit: parseInt(recordsPerPage)
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    sale_price: 1,
                    discountPrice: 1,
                    averageRating: 1,
                    categoryId: 1,
                    active: 1,
                    created_on: 1,
                    shortDescription: 1,
                    longDescription: 1,
                    additionalInformation: 1,
                    tags: 1,
                    isFeatured: 1,
                    isTop: 1,
                    isTrending: 1,
                    categoryName: "$category.name" // Retrieve the category name field
                }
            }
        ];

        const [products, [{ totalRecords }]] = await Promise.all([
            Product.aggregate(pipeline),
            Product.aggregate([{ $count: "totalRecords" }])
        ]);

        res.status(200).json({ products, totalRecords });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;