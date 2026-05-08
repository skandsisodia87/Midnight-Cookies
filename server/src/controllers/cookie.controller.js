import Cookie from "../models/cookie.model.js";
import slugify from "slugify";

export const createCookie = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      images,
      category,
      ingredients,
      stock,
      weight,
    } = req.body;

    const existingCookie = await Cookie.findOne({
      name,
    });

    if (existingCookie) {
      return res.status(400).json({
        success: false,
        message: "Cookie already exists",
      });
    }

    const cookie = await Cookie.create({
      name,
      description,
      price,
      discountPrice,
      images,
      category,
      ingredients,
      stock,
      weight,
    });

    return res.status(201).json({
      success: true,
      message: "Cookie created successfully",
      cookie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCookies = async (req, res) => {
  try {
    const cookies = await Cookie.find().limit(30).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: cookies.length,
      cookies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleCookie = async (req, res) => {
  try {
    const { id } = req.params;

    const cookie = await Cookie.findById(id);

    if (!cookie) {
      return res.status(404).json({
        success: false,
        message: "Cookie not found",
      });
    }

    return res.status(200).json({
      success: true,
      cookie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCookie = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCookie = await Cookie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCookie) {
      return res.status(404).json({
        success: false,
        message: "Cookie not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cookie updated successfully",
      cookie: updatedCookie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCookie = async (req, res) => {
  try {
    const { id } = req.params;
    const cookie = await Cookie.findById(id);
    if (!cookie) {
      return res
        .status(404)
        .json({ success: false, message: "Cookie not found" });
    }
    await cookie.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Cookie deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
