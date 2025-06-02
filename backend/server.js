import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/products', productRoutes); // Use the product routes defined in product.route.js

const port = process.env.PORT_1 || process.env.PORT_2;

app.listen(port, () => {
    connectDB();
});
