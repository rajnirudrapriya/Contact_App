const mongoose = require('mongoose');

// This function is exported and can be called from server.js
exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Gracefully exit if DB connection fails
  }
};
