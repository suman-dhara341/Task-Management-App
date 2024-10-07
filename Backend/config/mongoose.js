const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSEDB);
        console.log("DB Connection Successful");
    } catch (error) {
        console.error("DB Connection Unsuccessful:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
