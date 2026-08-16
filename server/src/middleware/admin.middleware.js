import constants from "../constants/constants.js";

const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== constants.ADMIN) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges are required.",
    });
  }

  next();
};

export default verifyAdmin;
