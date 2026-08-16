import { Schema, model } from "mongoose";
import constants from "../constants/constants.js";

const orderItemSchema = new Schema(
  {
    cookieId: {
      type: Schema.Types.ObjectId,
      ref: "Cookie",
      required: true,
    },
    variantId: {
      type: Schema.Types.ObjectId,
      ref: "CookieVariant",
      required: true,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    weight: {
      type: String,
      required: true,
      trim: true,
    },
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      default: null,
      min: 0,
    },
    finalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const shippingAddressSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
    },

    pincode: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    items: [orderItemSchema],

    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: [constants.COD, constants.ONLINE],
      default: constants.COD,
    },
    paymentStatus: {
      type: String,
      enum: [constants.PENDING, constants.PAID, constants.FAILED],
      default: constants.PENDING,
    },
    orderStatus: {
      type: String,
      enum: [
        constants.PLACED,
        constants.CONFIRMED,
        constants.BAKING,
        constants.SHIPPED,
        constants.DELIVERED,
        constants.CANCELLED,
      ],
      default: constants.PLACED,
    },
    shippingAddress: shippingAddressSchema,
    notes: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model("Order", orderSchema);
