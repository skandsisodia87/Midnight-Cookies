import mongoose from "mongoose";
import Cookie from "../models/cookie.model.js";
import slugify from "slugify";
import CookieVariant from "../models/cookieVariant.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllCookies = asyncHandler(async (req, res) => {
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
});

export const getSingleCookie = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const cookie = await Cookie.findOne(
    { slug, isActive: true },
    "-__v -updatedAt",
  ).lean();

  if (!cookie) {
    return res.status(404).json({
      success: false,
      message: constants.COOKIE_NOT_FOUND,
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
});

export const getFeaturedCookies = asyncHandler(async (req, res) => {
  let featuredCookies = await Cookie.aggregate([
    {
      $match: {
        isFeatured: true,
      },
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
        _id: 1,
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
    cookies: featuredCookies,
  });
});
