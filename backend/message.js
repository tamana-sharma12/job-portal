const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true
    },

    senderEmail: {
      type: String,
      required: true
    },

    employerEmail: {
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

    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Message", messageSchema);
