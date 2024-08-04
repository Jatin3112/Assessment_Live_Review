import express from "express";
import {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
  getReviewById,
} from "../controllers/reviews.controllers.js";

const router = express.Router();

router.post("/", createReview);

router.get("/", getReviews);

router.get("/:id", getReviewById);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

export default router;
