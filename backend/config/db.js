import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error('Errorrrrrrrrr:', error);
        process.exit(1); // 1 means failure, 0 means success
    }
}

export default connectDB;