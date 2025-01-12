import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB Atlas successfully!');
    } catch (error) {
        console.error('Failed to connect to MongoDB Atlas:', error.message);
        process.exit(1);
    }
};

