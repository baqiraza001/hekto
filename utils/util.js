const moment = require("moment/moment");
const jwt = require("jsonwebtoken")
const Review = require("../models/Review");
const Product = require("../models/Product");

const createJWTToken = (user, expTimeInHours = 6) => {
  const payload = {
    uid: user._id,
    iat: moment().unix(),
    exp: moment().add(expTimeInHours, "hours").unix(),
    claims: {
      // addional informations can be added here
      email: user.email
    }
  }
  const myPromise = new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_ENCRYPTION_KEY, (err, token) => {
      if (err)
        reject(err)
      resolve(token)
    })
  })
  return myPromise
}


const isSuperAdmin = (user) => {
  return ((user.type == process.env.USER_TYPE_SUPERADMIN))
}

const isAdmin = (user) => {
  return ((user.type == process.env.USER_TYPE_ADMIN))
}

const calculateAverageRating = async (productId) => {
  let productTotalRatings = await Review.find({ productId }, { rating: 1, _id: 0 });
  productTotalRatings = productTotalRatings.map(review => review.rating);
  if (productTotalRatings.length > 0) {
    const sum = productTotalRatings.reduce((total, rating) => total + rating, 0);
    const averageRating = (sum / productTotalRatings.length).toFixed(2);
    await Product.findByIdAndUpdate(productId, { averageRating })
  }
}

module.exports = {
  createJWTToken,
  isSuperAdmin,
  isAdmin,
  calculateAverageRating
}