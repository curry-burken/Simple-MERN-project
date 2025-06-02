import mongoose from 'mongoose';
import Product from '../models/product.model.js';

//TO FETCH DETAILS OF A SINGLE PRODUCT
export const getProduct = async (req,res) => {
    try{
        const{id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:"Product not found"});
        }
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error){
        res.json({message:error.message});
    }
}

//TO FETCH DETAILS OF ALL PRODUCTS
export const getProducts = async (req,res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success:true,message:products});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

//TO CREATE A NEW PRODUCT
export const createProduct = async (req, res) => {
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
}

//TO MODIFY AN ALREADY EXISTING PRODUCT
export const modifyProduct = async(req,res) => {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:"Product not found"});
        }
        const product = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:200,message:"Product updated",data:updatedProduct})
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

//TO DELETE AN ALREADY EXISTING PRODUCT
export const deleteProduct = async (req,res) => {
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product Deleted"});
    }
    catch (error){
        res.status(404).json({success:false, message:"Product not found"});
    }
}