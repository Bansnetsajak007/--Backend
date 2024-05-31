import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection established");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}
