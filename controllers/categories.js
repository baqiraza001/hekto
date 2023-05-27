const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/Category")
const { verifyUser } = require("../milddlewares/auth");
const { isSuperAdmin, isAdmin } = require("../utils/util");


const router = express.Router();
router.use(verifyUser)


// Adding Categories
router.post("/add", async (req, res) => {
  const {
      name,
      description
  } = req.body;
try {

  const category = new Category({
      name,
      description
  })
  await category.save()
  res.status(200).json({category})
} catch (error) {
  res.status(400).json([error.message]);
}
});


// Editing Categories
router.post("/edit", async (req, res) => {

  try {

      // if id is not available
      if (!req.body.id)
          throw new Error("Category id is required")


      // check for valid object Id using mongoose this will check the id is this id is according to formula of #
      if (!mongoose.isValidObjectId(req.body.id))
      throw new Error("Invalid Id");


      const category = await Category.findById(req.body.id)
      if (!Category)
          throw new Error("Invalid Id");

          const {
              name,
              description
          } = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(req.body.id, {
          name,
          description
      });
      res.json({ category: await Category.findById(req.body.id)  })

  } catch (err) {
      res.status(400).json({ error: err.message })
  }
})

// Deleting Categories
router.delete('/delete', async (req, res) => {
try {
  //  if id is not available
  if (!req.body.id)
    throw new Error("Category id is required")


  // check for valid object Id using mongoose this will check the id is this id is according to formula of #
  if (!mongoose.isValidObjectId(req.body.id))
    throw new Error("Invalid Id");


  // check for the valid id
  const category = await Category.findById(req.body.id)
  if (!category)
    throw new Error("Invalid Id");

  await Category.findByIdAndDelete(req.body.id)
  res.json({ success: true })
} catch (err) {
  res.status(400).json({ error: err.message })
}
})


// router.get("/", async(req, res) =>{
//   try{
//     let categories = await Category.find();

//     res.status(200).json(categories);
//   }catch(err){
//     res.status(400).json({ error: err.message })
//   }
// })

router.get("/", async (req, res) => {
try {
  const skip = parseInt(req.query.skip ? req.query.skip : 0);
  const recordsPerPage = req.query.limit ? req.query.limit : process.env.RECORDS_PER_PAGE;
  const totalRecords = await Category.countDocuments();
  // const users = await User.find({}, null, { skip, limit: parseInt(recordsPerPage), sort: { created_on: -1 } });
  const categories = await Category.find({}, null, { skip, limit: parseInt(recordsPerPage) });

  res.status(200).json({categories, totalRecords});
} catch (error) {
  res.status(400).json({ error: error.message });
}
});

router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find({});
  
    res.status(200).json({categories});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  });

module.exports = router;