const mongoose = require("mongoose");
const savedJobSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
         jobTitle: {
      type: String,
      required: true
    },

    companyName: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
    }
)
module.exports = mongoose.model("SavedJob", savedJobSchema);