const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    jobTitle: {
      type: String,
      required: true
    },

    companyName: {
      type: String,
      required: true
    },

    appliedOn: {
      type: Date,
      default: Date.now
    },

    status: {
      type: String,
      default: "New"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Application", applicationSchema);