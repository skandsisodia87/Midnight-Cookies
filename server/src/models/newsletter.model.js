import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

newsletterSchema.plugin(mongoosePaginate);

export default mongoose.model("Newsletter", newsletterSchema);
