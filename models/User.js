const moment = require("moment/moment");
const mongoose = require("mongoose");
const { userTypes, statusTypes } = require("../utils/constants");

mongoose.model('User', {});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: 250
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    maxlength: 250,
  },
  phone_number: {
    type: String,
    maxlength: 20,
    validate: {
      validator: function (v) {
        return v.length <= 20;
      },
      message: 'The phone number can not be more than 20 characters'
    }
  },
  profile_picture: {
    type: String,
    maxlength: 100
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    maxlength: 300
  },
  password_reset_code: {
    type: String,
    maxlength: 100
  },
  email_verification_code: {
    type: String,
    maxlength: 100
  },
  type: {
    type: Number,
    default: userTypes.USER_TYPE_SUPERADMIN,
    required: [true, "User type is required"],
  },
  active: {
    type: Number,
    default: statusTypes.ACTIVE_STATUS
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

userSchema.set('toJSON', {
  getters: true,
  transform: (doc, ret, options) => {
    ret.created_on = moment(ret.created_on).format('YYYY-MM-DD');
    ret.modified_on = moment(ret.modified_on).format('YYYY-MM-DD');
    return ret;
  }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
