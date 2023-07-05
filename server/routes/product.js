import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controller/product.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
// Create a new product
router.post("/", verifyToken, createProduct);

/* READ */
// Get all products
router.get("/", verifyToken, getAllProducts);
// Get a specific product by ID
router.get("/:id", verifyToken, getProductById);

/* UPDATE */
// Update a product by ID
router.patch("/:id", verifyToken , updateProduct);

/* DELETE */
// Delete a product by ID
router.delete("/:id", verifyToken , deleteProduct);

export default router;