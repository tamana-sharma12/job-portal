const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["admin", "employer", "jobseeker"],
        default: "jobseeker"
    },

    companyName: {
        type: String,
        default: ""
    },

    phone: {
        type: String,
        default: ""
    },

    location: {
        type: String,
        default: ""
    },

    website: {
        type: String,
        default: ""
    },

    companyDescription: {
        type: String,
        default: ""
    }

});

const User = mongoose.model("User", userSchema);

module.exports = User;