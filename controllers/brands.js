const express = require("express");
const mongoose = require("mongoose");
const Brand = require("../models/Brand")
const { verifyUser } = require("../milddlewares/auth");

const router = express.Router();
router.use(verifyUser)


// Adding Brands
router.post("/add", async (req, res) => {
  const {
      name,
      description
  } = req.body;
try {

  const brand = new Brand({
      name,
      description
  })
  await brand.save()
  res.status(200).json({brand})
} catch (error) {
  res.status(400).json([error.message]);
}
});


// Editing Brands
router.post("/edit", async (req, res) => {

  try {

      // if id is not available
      if (!req.body.id)
          throw new Error("Brand id is required")


      // check for valid object Id using mongoose this will check the id is this id is according to formula of #
      if (!mongoose.isValidObjectId(req.body.id))
      throw new Error("Invalid Id");


      const brand = await Brand.findById(req.body.id)
      if (!Brand)
          throw new Error("Invalid Id");

          const {
              name,
              description
          } = req.body;

      const updatedBrand = await Brand.findByIdAndUpdate(req.body.id, {
          name,
          description
      });
      res.json({ brand: await Brand.findById(req.body.id)  })

  } catch (err) {
      res.status(400).json({ error: err.message })
  }
})

// Deleting Brands
router.delete('/delete', async (req, res) => {
try {
  //  if id is not available
  if (!req.body.id)
    throw new Error("Brand id is required")


  // check for valid object Id using mongoose this will check the id is this id is according to formula of #
  if (!mongoose.isValidObjectId(req.body.id))
    throw new Error("Invalid Id");


  // check for the valid id
  const brand = await Brand.findById(req.body.id)
  if (!brand)
    throw new Error("Invalid Id");

  await Brand.findByIdAndDelete(req.body.id)
  res.json({ success: true })
} catch (err) {
  res.status(400).json({ error: err.message })
}
})


// router.get("/", async(req, res) =>{
//   try{
//     let brands = await Brand.find();

//     res.status(200).json(brands);
//   }catch(err){
//     res.status(400).json({ error: err.message })
//   }
// })

router.get("/", async (req, res) => {
try {
  const skip = parseInt(req.query.skip ? req.query.skip : 0);
  const recordsPerPage = req.query.limit ? req.query.limit : process.env.RECORDS_PER_PAGE;
  const totalRecords = await Brand.countDocuments();
  // const users = await User.find({}, null, { skip, limit: parseInt(recordsPerPage), sort: { created_on: -1 } });
  const brands = await Brand.find({}, null, { skip, limit: parseInt(recordsPerPage) });

  res.status(200).json({brands, totalRecords});
} catch (error) {
  res.status(400).json({ error: error.message });
}
});

router.get("/all", async (req, res) => {
  try {
    const brands = await Brand.find({});
  
    res.status(200).json({brands});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  });

module.exports = router;