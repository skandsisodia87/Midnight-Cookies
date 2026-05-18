import { Schema, model } from "mongoose";

const cartItemSchema = new Schema(
  {
    cookieId: {
      type: Schema.Types.ObjectId,
      ref: "Cookie",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    variantId: {
      type: Schema.Types.ObjectId,
      ref: "CookieVariant",
      required: true,
    },
  },
  {
    _id: false,
  },
);

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [cartItemSchema],
  },
  {
    timestamps: true,
  },
);

export default model("Cart", cartSchema);
