import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () =>{
    try {
        console.log("ytjjjjjjjjjjjjjjjjjjj");
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfully to ${conn.connection.host}`);
    } catch (error) {
        console.log("gerrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        console.error('Errorrrrrrrrr:', error);
        process.exit(1); // 1 means failure, 0 means success
    }
}

export default connectDB;