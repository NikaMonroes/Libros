import mongoose from "mongoose";

const connectDB = () => {
    const mongoUri = process.env.MONGODB_URI;

    try {
        mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }

}

export default connectDB