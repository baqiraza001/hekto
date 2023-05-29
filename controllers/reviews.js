const express = require("express");
const mongoose = require("mongoose");
const Review = require("../models/Review");
const { verifyUser } = require("../milddlewares/auth");
const { isSuperAdmin, calculateAverageRating } = require("../utils/util");

const router = express.Router();
router.use(['/delete'], verifyUser);


// Adding review
router.post("/add", async (req, res) => {
    const {
        rating,
        productId,
        reviewText
    } = req.body;
    try {

        if (!productId)
            throw new Error("Invalid Request")
        if (rating < 0 || rating > 5)
            throw new Error("Invalid Request")

        const review = new Review({
            rating,
            productId,
            reviewText
        })
        await review.save()

        calculateAverageRating(productId);

        res.status(200).json({ review })
    } catch (error) {
        res.status(400).json([error.message]);
    }
});

// Deleting Reviews
router.delete('/delete', async (req, res) => {
    try {
        if (isSuperAdmin(req.user))
            throw new Error("Invalid Request")

        //  if id is not available
        if (!req.body.id)
            throw new Error("Review id is requird")


        // check for valid object Id using mongoose this will check the id is this id is according to formula of #
        if (!mongoose.isValidObjectId(req.body.id))
            throw new Error("Invalid id");

        // check for the valid id
        const review = await Review.findById(req.body.id)
        if (!review)
            throw new Error("Invalid id");

        await Review.findByIdAndDelete(req.body.id)

        calculateAverageRating(review.productId);

        res.json({ success: true })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//Getting Reviews
router.get("/", async (req, res) => {
    try {
        const skip = parseInt(req.query.skip ? req.query.skip : 0);
        const recordsPerPage = req.query.limit ? req.query.limit : process.env.RECORDS_PER_PAGE;
        const totalRecords = await Review.countDocuments({ productId: req.query.productId });
        const reviews = await Review.find({ productId: req.query.productId }, null, { skip, limit: parseInt(recordsPerPage) });

        res.status(200).json({ reviews, totalRecords });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;