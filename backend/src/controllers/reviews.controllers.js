import { Review } from "../models/reviewSchema.model.js";

const createReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    req.io.emit("reviewAdded", review);
    deleteReview;
    res
      .status(201)
      .json({ success: true, review, message: "Review Created Successfully" });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.json({
      success: true,
      reviews: reviews,
      message: "Review Fetched Successfully",
    });
  } catch (error) {
    next(error);
  }
};
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({
      success: true,
      message: "Review Deleted Successfully",
      review: review,
    });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!review) {
      return res.status(404).send();
    }
    req.io.emit("reviewUpdated", review);
    res.status(201).json({
      success: true,
      message: "Review Deleted Successfully",
      review: review,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).send();
    }
    req.io.emit("reviewDeleted", review);
    res.status(201).json({
      success: true,
      message: "Review Deleted Successfully",
      review: review,
    });
  } catch (error) {
    next(error);
  }
};

export { createReview, getReviews, getReviewById, updateReview, deleteReview };
