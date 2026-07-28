import mongoose from "mongoose";
import Cookie from "../models/cookie.model.js";
import Order from "../models/order.model.js";
import slugify from "slugify";
import CookieVariant from "../models/cookieVariant.model.js";

export const getAllCookies = async (req, res) => {
  try {
    const cookies = await Cookie.aggregate([
      {
        $match: {
          isActive: true,
          isDeleted: false,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 30,
      },
      {
        $lookup: {
          from: "cookievariants",
          localField: "_id",
          foreignField: "cookieId",
          as: "variants",
        },
      },
      {
        $project: {
          name: 1,
          slug: 1,
          description: 1,
          images: 1,
          category: 1,
          defaultVariant: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$variants",

                  as: "variant",

                  cond: {
                    $eq: ["$$variant.weight", "500g"],
                  },
                },
              },
              0,
            ],
          },
        },
      },
    ]);

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
    const { slug } = req.params;

    const cookie = await Cookie.findOne(
      { slug, isActive: true },
      "-__v -updatedAt",
    ).lean();

    if (!cookie) {
      return res.status(404).json({
        success: false,
        message: "Cookie not found",
      });
    }

    const variants = await CookieVariant.find({
      cookieId: cookie._id,
    });

    return res.status(200).json({
      success: true,
      message: "Cookie fetched successfully.",
      cookie: {
        ...cookie,
        variants,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFeaturedCookies = async (req, res) => {
  try {
    const featuredCookies = await Cookie.find({
      isFeatured: true,
    });

    return res.status(200).json({
      success: true,
      cookies: featuredCookies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
