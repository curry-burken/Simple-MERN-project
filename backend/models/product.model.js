import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
},{
    timestamps: true //createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema); // 'Product' is the name of the collection in MongoDB and productSchema is the schema definition
export default Product;