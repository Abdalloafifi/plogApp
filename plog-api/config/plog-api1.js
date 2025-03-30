const mongoose = require('mongoose');

// Connect to MongoDB

module.exports = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log("MongoDB connected🎉🎉");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

