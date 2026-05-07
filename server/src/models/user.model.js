import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const addressSchema = new Schema({
  fullAddress: {
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
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    addresses: [addressSchema],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default model("User", userSchema);
