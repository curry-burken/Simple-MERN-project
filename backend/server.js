import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const port = process.env.PORT_1 || process.env.PORT_2;

app.listen(port, () => {
    connectDB();
});

app.get("/",(req,res)=>{
    res.send("<h1>test</h1>");
});

app.post("/products", async (req, res) => {
    const product = req.body;
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false,message:"All fields are required"});
    }
    const newProduct = new Product(product)
    try{
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    }
    catch(error) {
        console.error("Error creating product:", error);
        res.status(500).json({success:false, message:error.message});
    }
});

