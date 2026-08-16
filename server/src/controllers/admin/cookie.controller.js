import Cookie from "../../models/cookie.model.js";
import CookieVariant from "../../models/cookieVariant.model.js";
import { uploadOnCloudinary } from "../../services/cloudinary.service.js";
import mongoose from "mongoose";
import asyncHandler from "../../utils/asyncHandler.js";
import constants from "../../constants/constants.js";

export const createCookie = asyncHandler(async (req, res) => {
  const { name, description, category, ingredients, variants } = req.body;

  const file = req.file;

  if (!file || !file.path) {
    return res.status(400).json({
      success: false,
      message: IMAGE_NOT_FOUND,
    });
  }

  const existingCookie = await Cookie.findOne({
    name,
  });

  if (existingCookie) {
    return res.status(400).json({
      success: false,
      message: "Cookie already exists",
    });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cookie = await Cookie.create(
      [
        {
          name,
          description,
          images: [uploadedImage],
          category,
          ingredients,
        },
      ],
      { session },
    );

    const variantsToInsert = variants.map((variant) => ({
      cookieId: cookie._id,
      weight: variant.weight,
      price: variant.price,
      discountPrice: variant.discountPrice,
      stock: variant.stock,
      isAvailable: variant.isAvailable ?? true,
      sku: `${cookie.name}-${variant.weight}`
        .replace(/\s+/g, "-")
        .toUpperCase(),
    }));

    await CookieVariant.insertMany(variantsToInsert, { session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
  } finally {
    session.endSession();
  }

  return res.status(201).json({
    success: true,
    message: "Cookie created successfully",
  });
});

export const bulkCreateCookies = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const cookies = req.body;

    if (!Array.isArray(cookies) || cookies.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Cookies array is required",
      });
    }

    // Generate slugs
    const cookiesWithSlug = cookies.map((cookie) => ({
      ...cookie,
      slug: slugify(cookie.name, {
        lower: true,
        strict: true,
      }),
    }));

    // Extract names
    const cookieNames = cookiesWithSlug.map((cookie) => cookie.name);

    // Existing cookies
    const existingCookies = await Cookie.find({
      name: {
        $in: cookieNames,
      },
    })
      .select("name")
      .lean();

    const existingCookieNames = new Set(
      existingCookies.map((cookie) => cookie.name),
    );

    // Only new cookies
    const newCookies = cookiesWithSlug.filter(
      (cookie) => !existingCookieNames.has(cookie.name),
    );

    if (newCookies.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "All cookies already exist",
      });
    }

    // Prepare cookie docs
    const cookiesToInsert = newCookies.map(({ variants, ...cookie }) => cookie);

    // Insert cookies
    const insertedCookies = await Cookie.insertMany(cookiesToInsert, {
      session,
    });

    // Prepare variants
    const variantsToInsert = [];

    insertedCookies.forEach((insertedCookie, index) => {
      const originalCookie = newCookies[index];

      originalCookie.variants.forEach((variant) => {
        variantsToInsert.push({
          cookieId: insertedCookie._id,
          weight: variant.weight,
          price: variant.price,
          discountPrice: variant.discountPrice,
          stock: variant.stock,
          isAvailable: variant.isAvailable,
          sku: `${insertedCookie.name}-${variant.weight}`
            .replace(/\s+/g, "-")
            .toUpperCase(),
        });
      });
    });

    // Insert variants
    const insertedVariants = await CookieVariant.insertMany(variantsToInsert, {
      session,
    });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Cookies created successfully",
      totalReceived: cookies.length,
      insertedCount: insertedCookies.length,
      skippedCount: existingCookies.length,
      insertedCookies,
      insertedVariants,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCookie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedCookie = await Cookie.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedCookie) {
    return res.status(404).json({
      success: false,
      message: constants.COOKIE_NOT_FOUND,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Cookie updated successfully",
    cookie: updatedCookie,
  });
});

export const softDeleteCookie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cookie = await Cookie.findById(id);

  if (!cookie) {
    return res.status(404).json({
      success: false,
      message: constants.COOKIE_NOT_FOUND,
    });
  }

  cookie.isDeleted = true;
  cookie.isActive = false;
  cookie.isFeatured = false;

  await cookie.save();

  return res.status(200).json({
    success: true,
    message: "Cookie deleted successfully",
  });
});

export const deleteCookie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cookie = await Cookie.findById(id);

  if (!cookie) {
    return res.status(404).json({
      success: false,
      message: constants.COOKIE_NOT_FOUND,
    });
  }

  await CookieVariant.deleteMany({
    cookieId: cookie._id,
  });

  await cookie.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Cookie deleted successfully",
  });
});

export const updateCookieStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cookie = await Cookie.findById(id);

  if (!cookie) {
    return res.status(404).json({
      success: false,
      message: constants.COOKIE_NOT_FOUND,
    });
  }

  const newStatus = !cookie.isActive;

  const dataToUpdate = {
    isActive: newStatus,
  };

  if (!newStatus) {
    dataToUpdate.isFeatured = false;
  }

  cookie.isActive && (dataToUpdate.isFeatured = false);
  const updatedCookie = await Cookie.findByIdAndUpdate(id, dataToUpdate);

  return res.status(200).json({
    success: true,
    message: "Cookie status updated successfully",
  });
});

export const getCookies = asyncHandler(async (req, res) => {
  const {
    isActive,
    category,
    isFeatured,
    slug,
    page = 1,
    limit = 10,
  } = req.body;

  const query = {};

  if (isActive !== undefined) {
    query.isActive = isActive;
  }

  if (isFeatured !== undefined) {
    query.isFeatured = isFeatured;
  }

  if (category) {
    query.category = category;
  }

  if (slug) {
    query.slug = slug.trim();
  }

  const options = {
    page: Math.max(Number(page), 1),
    limit: Math.max(Number(limit), 1),
    sort: { createdAt: -1 },
    lean: true,
  };

  const cookies = await Cookie.paginate(query, options);

  return res.status(200).json({
    success: true,
    message: "Cookies fetched successfully",
    data: cookies.docs,
    pagination: {
      totalDocs: cookies.totalDocs,
      totalPages: cookies.totalPages,
      // page: cookies.page,
      // limit: cookies.limit,
      hasPrevPage: cookies.hasPrevPage,
      hasNextPage: cookies.hasNextPage,
      prevPage: cookies.prevPage,
      nextPage: cookies.nextPage,
    },
  });
});

export const getCookie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cookie = await Cookie.findById(id, "-__v -updatedAt").lean();

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
    data: {
      ...cookie,
      variants,
    },
  });
});
