import { Schema, model } from "mongoose";

const cookieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: String,
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    weight: {
      type: String,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Cookie", cookieSchema);
