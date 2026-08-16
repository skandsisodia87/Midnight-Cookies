import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import env from "../config/env.js";
import constants from "../constants/constants.js";

const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
        code: "LOGOUT_USER",
      });
    }

    try {
      // Verify access token
      const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decoded._id).select(
        "-password -refreshToken",
      );

      if (!user) {
        return res.status(401).json({
          success: false,
          message: constants.USER_NOT_FOUND,
          code: "LOGOUT_USER",
        });
      }

      req.user = user;

      return next();
    } catch (error) {
      // Only handle expired access token
      if (error.name !== "TokenExpiredError") {
        throw error;
      }

      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Session expired",
          code: "LOGOUT_USER",
        });
      }

      const decodedRefresh = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);

      const user = await User.findById(decodedRefresh._id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: constants.INVALID_REFRESH_TOKEN,
          code: "LOGOUT_USER",
        });
      }

      if (user.refreshToken !== refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Refresh token mismatch",
          code: "LOGOUT_USER",
        });
      }

      const newAccessToken = await user.generateAccessToken();

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === constants.PRODUCTION,
        // sameSite: "none", // for same domain use sameSite: "strict"
      });

      req.user = user;

      next();
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Unauthorized",
      code: "LOGOUT_USER",
    });
  }
};

export default verifyToken;
