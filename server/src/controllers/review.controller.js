import Review from "../models/review.model.js";
import Cookie from "../models/cookie.model.js";

export const createReview = async (req, res) => {
  try {
    const { cookieId, rating, review } = req.body;

    const cookie = await Cookie.findById(cookieId);

    if (!cookie) {
      return res.status(404).json({
        success: false,
        message: "Cookie not found",
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCookieReviews = async (req, res) => {
  try {
    const { cookieId } = req.params;

    const reviews = await Review.find({ cookieId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,

      total: reviews.length,

      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
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
      req.user.role !== "admin"
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
