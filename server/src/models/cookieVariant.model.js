import { Schema, model } from "mongoose";

const cookieVariantSchema = new Schema(
  {
    cookieId: {
      type: Schema.Types.ObjectId,
      ref: "Cookie",
      required: true,
      index: true,
    },

    weight: {
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

    stock: {
      type: Number,
      default: 0,
    },

    sku: {
      type: String,
      unique: true,
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  },
);

cookieVariantSchema.index(
  {
    cookieId: 1,
    weight: 1,
  },
  {
    unique: true,
  },
);

cookieVariantSchema.pre(
  "save",
  async function () {
    if (!this.isModified("weight") && this.sku) {
      return;
    }

    await this.populate("cookieId", "name");

    this.sku = `${this.cookieId.name}-${this.weight}`
      .replace(/\s+/g, "-")
      .toUpperCase();
  },
);

export default model("CookieVariant", cookieVariantSchema);
