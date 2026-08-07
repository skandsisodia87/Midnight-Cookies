import { Schema, model } from "mongoose";

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
      enum: ["COD", "ONLINE"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "baking",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },
    shippingAddress: shippingAddressSchema,
    notes: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model("Order", orderSchema);
