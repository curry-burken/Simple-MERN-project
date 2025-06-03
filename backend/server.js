import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/product.route.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({ origin: "*" })); //This allows CORS requests from the frontend URL specified in the .env file 

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/products', productRoutes); // Use the product routes defined in product.route.js

const port = process.env.BACKEND_PORT;

app.listen(port, () => {
    connectDB();
});
