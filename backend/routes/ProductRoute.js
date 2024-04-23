import express from "express"; //aimport express 
import { getProducts , getProductById , createProduct , updateProduct , deleteProduct } from "../controllers/Products.js";
import {verifyUser} from "../middleware/AuthUser.js"
const router = express.Router();    // Create a new router

router.get('/products',verifyUser, getProducts);    // Get all products    
router.post('/products',verifyUser, createProduct);    // Create a new product
router.get('/products/:id',verifyUser, getProductById);    // Get a product by id
router.patch('/products/:id',verifyUser, updateProduct);    // Update a product by id
router.delete('/products/:id',verifyUser,deleteProduct);    // Delete a product by id


export default router;    // Export the router