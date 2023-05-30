const moment = require("moment/moment");
const mongoose = require("mongoose");

mongoose.model('Product', {});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: 250
  },
  shortDescription: {
    type: String,
    required: [true, "Product description is required"],
  },
  productPictures: {
    type: Array,
  },
  price: {
    type: Number,
    required: [true, "Product Price is required"],
  },
  sale_price: {
    type: Number,
  },
  discountPrice : {
    type: Number
  },
  discountPercentage : {
    type: Number
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  color: {
    type: String,
  },
  isFeatured: {
    type: Boolean
  },
  isTrending: {
    type: Boolean
  },
  isTop: {
    type: Boolean
  },
  averageRating: {
    type: Number
  },
  tags: {
    type: String,
  },
  longDescription: {
    type: String
  },
  additionalInformation: {
    type: String
  },
  active: {
    type: Number,
    default: process.env.ACTIVE_STATUS
  },
  created_on: {
    type: Date,
    default: moment().format('YYYY-MM-DD')
  },
  modified_on: {
    type: Date,
    default: moment().format('YYYY-MM-DD')
  },

});

productSchema.set('toJSON', {
  getters: true,
  transform: (doc, ret, options) => {
    ret.created_on = moment(ret.created_on).format('YYYY-MM-DD');
    ret.modified_on = moment(ret.modified_on).format('YYYY-MM-DD');
    return ret;
  }
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;