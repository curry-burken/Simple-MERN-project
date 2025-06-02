import express from 'express';
import { getProduct, getProducts, createProduct, modifyProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

//ROOT PAGE
// router.get("/",(req,res)=>{
//     res.send("<h1>test</h1>");
// });

//TO FETCH DETAILS OF A SINGLE PRODUCT
router.get("/:id", getProduct);

//TO FETCH DETAILS OF ALL PRODUCTS
router.get("/", getProducts);

//TO CREATE A NEW PRODUCT
router.post("/", createProduct);

//TO MODIFY AN ALREADY EXISTING PRODUCT
router.put("/:id", modifyProduct);

//TO DELETE AN ALREADY EXISTING PRODUCT
router.delete("/:id", deleteProduct);

export default router;