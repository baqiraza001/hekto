const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
// const { createJWTToken } = require('../utils/util');
// const { verifyUser } = require('../utils/middlewares');
const { checkSchema, validationResult } = require('express-validator');
const User = require("../models/User");

const router = express.Router();
// router.use(['/profile-settings', '/add', '/edit', '/delete'], verifyUser);

router.post("/login", async (req, res) => {

  try {
    if (!req.body.email) throw new Error("Email is required");
    if (!req.body.password) throw new Error("Password is required");
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("Email or password is incorrect");
    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error("Email or password is incorrect");

    //promise ko hum await kr skty hn bcz isky andar async task perform hty hn
    const token = await createJWTToken(user, 12);
    res.json({ token, user });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ errors });
    }
    res.status(400).json({ error: error.message });
  }
});

router.get("/profile-settings", async (req, res) => {

  try {
    res.json({
      test: 'test'
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

});


const userSchema = checkSchema({
  name: {
    notEmpty: {
      errorMessage: 'Name is required',
    },
  },
  email: {
    notEmpty: {
      errorMessage: 'Email is required',
    },
    isEmail: {
      errorMessage: 'Email is invalid',
    },
    custom: {
      options: async (value, { req }) => {
        const user = await User.findOne({ email: value, _id: { $ne: req.body.id } });
        if (user) {
          throw new Error('Email already exists');
        }
        return true;
      },
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Password is required',
    },
  },
  type: {
    notEmpty: {
      errorMessage: 'User type is required',
    },
  }

});


router.post("/add", userSchema, async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errors = validationResult(req).array({ onlyFirstError: true }).map(error => error.msg);
    return res.status(400).json({ errors });
  }

  try {

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      type: req.body.type,
      phone_number: req.body.phone_number,
      password: await bcrypt.hash(req.body.password, 10),
    });

    await user.save();

    user = user.toObject();
    delete user.password;

    res.json({ user });
  } catch (error) {

    if (error.name === "ValidationError") {
      let errors = [];

      Object.keys(error.errors).forEach((key) => {
        errors.push(error.errors[key].message);
      });
      return res.status(400).json({ errors });
    }

    res.status(400).json([error.message]);
  }
});

// router.post('/edit/:userId', async (req, res) => {
router.post("/edit", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("User id is required");
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error("User id is invalid");
    // if (req.user._id.toString() !== req.body.id) // to string is used to convert req.user._id to string because this returns new ObjectId("6439f4ca31d7babed61963e0") that is object user id and we need only string to compare it.
    //   throw new Error("Invalid request s");

    const user = await User.findById(req.body.id);
    if (!user) throw new Error("User does not exists");

    await User.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      type: req.body.type
    });

    res.json({ user: await User.findById(req.body.id) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("User id is required");
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error("User id is invalid");

    const user = await User.findById(req.body.id);
    if (!user) throw new Error("User does not exists");

    await User.findByIdAndDelete(req.body.id);

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const skip = parseInt(req.query.skip ? req.query.skip : 0);
    const recordsPerPage = req.query.limit ? req.query.limit : process.env.RECORDS_PER_PAGE;
    const totalRecords = await User.countDocuments();
    // const users = await User.find({}, null, { skip, limit: parseInt(recordsPerPage), sort: { created_on: -1 } });
    const users = await User.find({}, null, { skip, limit: parseInt(recordsPerPage) });

    res.status(200).json({users, totalRecords});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
