const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://tamanasharma863_db_user:abc_123@cluster0.jx6nslm.mongodb.net/jobportal");
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Connection Error:", error);
    }
};

connectDB();