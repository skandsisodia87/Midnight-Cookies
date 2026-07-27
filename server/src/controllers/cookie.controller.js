import mongoose from "mongoose";
import Cookie from "../models/cookie.model.js";
import Order from "../models/order.model.js";
import slugify from "slugify";
import CookieVariant from "../models/cookieVariant.model.js";

export const getAllCookies = async (req, res) => {
  try {
    const cookies = await Cookie.aggregate([
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

    const cookie = await Cookie.findOne({ slug }, "-__v -updatedAt").lean();

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

export const getFeaturedCookies = async (req, res) => {
  try {
    let featuredCookies = await Order.aggregate([
      // only successful orders
      {
        $match: {
          orderStatus: {
            $in: ["confirmed", "processing", "shipped", "delivered"],
          },
        },
      },

      // explode items
      {
        $unwind: "$items",
      },

      // group by cookie
      {
        $group: {
          _id: "$items.cookieId",

          totalOrdered: {
            $sum: "$items.quantity",
          },
        },
      },

      // top ordered first
      {
        $sort: {
          totalOrdered: -1,
        },
      },

      // limit results
      {
        $limit: 3,
      },

      // fetch cookie
      {
        $lookup: {
          from: "cookies",
          localField: "_id",
          foreignField: "_id",
          as: "cookie",
        },
      },

      {
        $unwind: "$cookie",
      },

      // fetch variants
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
          _id: "$cookie._id",
          name: "$cookie.name",
          slug: "$cookie.slug",
          description: "$cookie.description",
          images: "$cookie.images",
          category: "$cookie.category",
          variants: "$variants",
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

    if (featuredCookies.length < 3) {
      featuredCookies = await Cookie.aggregate([
        {
          $match: {
            category: {
              $in: ["Classic", "Chocolate", "Premium"],
            },
          },
        },
        {
          $limit: 3,
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
    }

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
