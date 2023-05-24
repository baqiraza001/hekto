const express = require("express");
const mongoose = require("mongoose");
const Review = require("../models/Review");


const router = express.Router();



// Adding product
router.post("/add", async (req, res) => {
    const {
        rating,
        productId,
        reviewText
    } = req.body;
    try {

        if( !productId )
            throw new Error("Invalid Request")
        if( rating < 0 && rating > 5 )
            throw new Error("Invalid Request")

        const review = new Review({
            rating,
            productId,
            reviewText
        })
        await review.save()
        res.status(200).json({ review })
    } catch (error) {
        res.status(400).json([error.message]);
    }
});

//Getting Products
router.get("/", async (req, res) => {
    try {
        let review = await Review.find();
        res.status(200).json({ review });
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

module.exports = router;