const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product")
const { isSuperAdmin, isAdmin } = require("../utils/util");
const { verifyUser } = require("../milddlewares/auth");


const router = express.Router();
router.use(verifyUser)



// Adding product
router.post("/add", async (req, res) => {

    const {
        name,
        description,
        product_picture,
        price,
        sale_price,
        brand,
        categoryId,
        active
    } = req.body;
  
    try {
        // if(isSuperAdmin(req.user) || isAdmin(req.user))
        //     throw new Error("Invalid Request")

        const product = await new Product({
            name,
            description,
            product_picture,
            price,
            sale_price,
            brand,
            categoryId,
            active
        })
        await product.save()
        res.status(200).json({ product })
    } catch (error) {
        res.status(400).json([error.message]);
    }
});


// Editing Products
router.post("/edit", async (req, res) => {

    try {
        if (isSuperAdmin(req.user) && isAdmin(req.user))
            throw new Error("Invalid Request")

        // if id is not available
        if (!req.body.id)
            throw new Error("Product id is requird")


        // check for valid object Id using mongoose this will check the id is this id is according to formula of #
        if (!mongoose.isValidObjectId(req.body.id))
            throw new Error("Invalid Id");


        const product = await Product.findById(req.body.id)
        if (!product)
            throw new Error("Invalid Id");

        const {
            name,
            price,
            sale_price,
            description,
            categoryId
        } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(req.body.id, {
            name,
            price,
            sale_price,
            description
        });
        res.json({ product: updatedProduct })

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
        const skip = parseInt(req.query.skip ? req.query.skip : 0);
        const recordsPerPage = req.query.limit ? req.query.limit : process.env.RECORDS_PER_PAGE;
        const totalRecords = await Product.countDocuments();
        // const users = await User.find({}, null, { skip, limit: parseInt(recordsPerPage), sort: { created_on: -1 } });
        const products = await Product.find({}, null, { skip, limit: parseInt(recordsPerPage) });
    
        res.status(200).json({products, totalRecords});
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})

module.exports = router;