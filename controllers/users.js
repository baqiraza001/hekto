const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { createJWTToken } = require('../utils/util');
const { checkSchema, validationResult } = require('express-validator');
const User = require("../models/User")
const { verifyUser } = require("../milddlewares/auth")
const { randomBytes } = require('crypto');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const fse = require('fs-extra');

const router = express.Router();
router.use(['/profile-update', '/add', '/edit', '/delete', "/profile"], verifyUser);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.mkdir(`content/${req.user._id}/`, { recursive: true });
      cb(null, `content/${req.user._id}/`);
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
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['jpg', 'png', 'gif', 'bmp', 'jpeg'];
    const ext = path.extname(file.originalname).replace('.', '');
    if (allowedTypes.includes(ext))
      cb(null, true);
    else {
      cb(new Error("File type is not allowed"), false);
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body.email)
      throw new Error("Email is required");
    if (!req.body.password)
      throw new Error("Password is required");
    let user = await User.findOne({ email: { $regex: new RegExp(req.body.email, "i") } });
    if (!user)
      throw new Error("Email or password is incorrect");

    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error("Email or password is incorrect");

    user = user.toObject()
    delete user.password

    //promise ko hum await kr skty hn bcz isky andar async task perform hty hn
    const token = await createJWTToken(user, 5000);
    res.json({ user, token });
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

router.post("/forgot-password", async (req, res) => {

  try {
    if (!req.body.email)
      throw new Error("User email is required")
    let user = await User.findOne({ email: req.body.email })
    if (!user)
      throw new Error("Invalid Request")
    const password_reset_code = user._id.toString() + randomBytes(Math.ceil(25 / 2)).toString('hex').slice(0, 25);
    await User.findByIdAndUpdate(user._id, { password_reset_code });
    const resetPasswordUrl = process.env.BASE_URL + "admin/reset-password/" + password_reset_code;

    const data = {
      Recipients: {
        To: [user.email]
      },
      Content: {
        Body: [{
          ContentType: 'HTML',
          Content: await ejs.renderFile('./emails/resetPassword.ejs', { name: user.name, resetPasswordUrl }),
          Charset: "utf8"
        }],
        subject: "Reset Password",
        from: process.env.EMAIL_FROM
      }
    }

    // const response = await axios.post('https://api.elasticemail.com/v4/emails/transactional', data, {
    //   headers: { 'X-ElasticEmail-ApiKey': process.env.EMAIL_API_KEY }
    // })

    res.json({ success: true });


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

router.post("/verify-reset-code", async (req, res) => {

  try {
    if (!req.body.code) throw new Error("Code is required");
    let user = await User.findOne({ password_reset_code: req.body.code });
    if (!user) throw new Error("Invalid request");

    user = user.toObject();
    delete user.password;

    res.json({ user });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/reset-password", async (req, res) => {

  try {
    if (!req.body.code) throw new Error("Code is required");
    if (!req.body.newPassword) throw new Error("New password is required");
    if (!req.body.confirmPassword) throw new Error("Confirm password is required");

    if (req.body.newPassword.length < 6)
      throw new Error("Password should have at least 6 characters");

    if (req.body.newPassword !== req.body.confirmPassword)
      throw new Error("Passwords are not same");

    let user = await User.findOne({ password_reset_code: req.body.code });
    if (!user) throw new Error("Invalid request");

    await User.findByIdAndUpdate(user._id, {
      password: await bcrypt.hash(req.body.newPassword, 10),
      password_reset_code: ''
    })

    res.json({ success: true });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post("/profile-update", upload.single('profile_picture'), async (req, res) => {

  try {

    const record = {
      name: req.body.name,
      phone_number: req.body.phone_number,
    }
    if (req.file && req.file.filename) {
      record.profile_picture = req.file.filename;
      if (req.user.profile_picture && req.user.profile_picture !== req.file.filename) {
        const oldPicPath = `content/${req.user._id}/${req.user.profile_picture}`;
        if (fse.existsSync(oldPicPath))
          await fs.unlink(oldPicPath);
      }
    }
    if (!req.body.name) throw new Error("Name is required");

    if (req.body.newPassword) {
      if (!req.body.currentPassword) throw new Error("Current password is required");

      if (!(await bcrypt.compare(req.body.currentPassword, req.user.password)))
        throw new Error("Current password is incorrect");

      if (!req.body.newPassword.length < 6) throw new Error("New password should have atleast 6 characters");

      if (req.body.newPassword !== req.body.confirmPassword) throw new Error("Passwords are not same");
      record.password = await bcrypt.hash(req.body.newPassword, 10)
    }

    await User.findByIdAndUpdate(req.user._id, record)

    let updatedUser = await User.findById(req.user._id);

    updatedUser = updatedUser.toObject();
    delete updatedUser.password;
    res.json({ user: updatedUser });

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
    // if( isSuperAdmin(req.user) )
    //   throw new Error("Invalid Request")
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
    // if( isSuperAdmin(req.user) )
    //   throw new Error("Invalid Request")

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



router.get("/profile", async (req, res) => {
  try {
    let user = await User.findById(req.user._id)
    user = user.toObject()
    delete user.password
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})



router.delete("/delete", async (req, res) => {
  try {
    // if( isSuperAdmin(req.user) )
    //   throw new Error("Invalid Request")

    if (!req.body.id)
      throw new Error("Invalid request");
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error("Invalid request");

    const user = await User.findById(req.body.id);
    if (!user) throw new Error("Invalid Request");

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

    res.status(200).json({ users, totalRecords });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;