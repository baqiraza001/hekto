const mongoose = require("mongoose");

mongoose.model('Configuration', {});

const configurationSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: [true, "SIte Name is required"],
        maxlength: 250
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        maxlength: 250,
    },
    phoneNumber: {
        type: String,
        maxlength: 20
    },
    address: {
        type: String,
    },
    logo: {
        type: String,
        maxlength: 100
    },
    tagline: {
        type: String,
        maxlength: 300
    },
    facebookLink: {
        type: String,
        maxlength: 300
    },
    twitterLink: {
        type: String,
        maxlength: 300
    },
    instagramLink: {
        type: String,
        maxlength: 300
    }
});


const Configuration = mongoose.model("configuration", configurationSchema);

module.exports = Configuration;