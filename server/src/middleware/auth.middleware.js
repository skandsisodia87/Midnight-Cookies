import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import env from "../config/env.js";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    if (user.accessToken !== token) {
      return res.status(401).json({
        success: false,
        message: "Token expired or logged out",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired",
        code: "TOKEN_EXPIRED",
      });
    }

    return res.status(401).json({
      success: false,
      message: error.message || "Invalid access token",
    });
  }
};

export default verifyToken;
