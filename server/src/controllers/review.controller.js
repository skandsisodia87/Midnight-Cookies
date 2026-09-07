import Review from "../models/review.model.js";
import Cookie from "../models/cookie.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import constants from "../constants/constants.js";

export const createReview = asyncHandler(async (req, res) => {
  const { cookieId, rating, review } = req.body;

  const cookie = await Cookie.findById(cookieId);

  if (!cookie) {
    return res.status(404).json({
      success: false,
      message: constants.COOKIE_NOT_FOUND,
    });
  }

  const existingReview = await Review.findOne({
    userId: req.user._id,
    cookieId,
  });

  if (existingReview) {
    return res.status(400).json({
      success: false,
      message: "You already reviewed this cookie",
    });
  }

  const createdReview = await Review.create({
    userId: req.user._id,
    cookieId,
    rating,
    review,
  });

  const reviews = await Review.find({
    cookieId,
  });

  const totalReviews = reviews.length;
  const avgRating =
    reviews.reduce((acc, item) => acc + item.rating, 0) / totalReviews;

  cookie.ratings = avgRating.toFixed(1);

  cookie.totalReviews = totalReviews;

  await cookie.save({
    validateBeforeSave: false,
  });

  return res.status(201).json({
    success: true,
    message: "Review added successfully",

    review: createdReview,
  });
});

export const getCookieReviews = asyncHandler(async (req, res) => {
  const { cookieId } = req.params;

  const reviews = await Review.find({ cookieId })
    .populate("userId", "name")
    .sort({ createdAt: -1 })
    .limit(5);

  return res.status(200).json({
    success: true,
    reviews,
  });
});

export const getTestimonials = asyncHandler(async (_req, res) => {
  const reviews = await Review.find({ review: { $exists: true, $ne: "" } })
    .populate("userId", "name")
    .populate("cookieId", "name")
    .sort({ createdAt: -1 })
    .limit(5);

  return res.status(200).json({
    success: true,
    reviews,
  });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  if (
    review.userId.toString() !== req.user._id.toString() &&
    req.user.role !== constants.ADMIN
  ) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  const cookieId = review.cookieId;

  await review.deleteOne();

  const reviews = await Review.find({
    cookieId,
  });

  const totalReviews = reviews.length;

  let averageRating = 0;

  if (totalReviews > 0) {
    averageRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) / totalReviews;
  }

  await Cookie.findByIdAndUpdate(cookieId, {
    ratings: averageRating.toFixed(1),
    totalReviews,
  });

  return res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});
