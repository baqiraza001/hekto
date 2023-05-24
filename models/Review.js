const moment = require("moment/moment");
const mongoose = require("mongoose");

mongoose.model('Review', {});

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "Rating is required"],
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Product Id is required"],
  },
  reviewText: {
    type: String,
  },
  created_on: {
    type: Date,
    default: moment().format('YYYY-MM-DD')
  }
});

reviewSchema.set('toJSON', {
  getters: true,
  transform: (doc, ret, options) => {
    ret.created_on = moment(ret.created_on).format('YYYY-MM-DD');
    ret.modified_on = moment(ret.modified_on).format('YYYY-MM-DD');
    return ret;
  }
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;