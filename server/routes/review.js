import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
} from "../controller/review.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
// create a review for a product
router.post("/:productId", verifyToken, createReview);

/* READ */
// Get all reviews for a product
router.get("/:productId", verifyToken, getAllReviews);
// Get a specific review by Id
router.get("/:id", verifyToken, getReviewById);

/* UPDATE */
// Update a review by ID
router.patch("/:id", verifyToken, updateReview);

/* DELETE */
// Delete a review by ID
router.delete("/:id", verifyToken, deleteReview);

export default router;