import Cookie from "../../models/cookie.model.js";
import CookieVariant from "../../models/cookieVariant.model.js";
import Category from "../../models/category.model.js";
import { uploadOnCloudinary } from "../../services/cloudinary.service.js";
import mongoose from "mongoose";
import asyncHandler from "../../utils/asyncHandler.js";
import constants from "../../constants/constants.js";
import slugify from "slugify";

export const createCookie = asyncHandler(async (req, res) => {
  let { name, description, category, ingredients, variants, isFeatured, isActive } = req.body;

  const file = req.file;

  if (!file || !file.path) {
    return res.status(400).json({
      success: false,
      message: "Cookie image is required",
    });
  }

  // Parse if JSON strings from multipart FormData
  if (typeof ingredients === "string") {
    try {
      ingredients = JSON.parse(ingredients);
    } catch {
      ingredients = ingredients.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  if (typeof variants === "string") {
    try {
      variants = JSON.parse(variants);
    } catch {
      variants = [];
    }
  }

  const existingCookie = await Cookie.findOne({
    name: name.trim(),
  });

  if (existingCookie) {
    return res.status(400).json({
      success: false,
      message: "Cookie with this name already exists",
    });
  }

  const uploadedImage = await uploadOnCloudinary(file.path);
  if (!uploadedImage) {
    return res.status(500).json({
      success: false,
      message: "Failed to upload cookie image",
    });
  }

  const session = await mongoose.startSession();
  let createdCookie;
  let createdVariants = [];

  try {
    session.startTransaction();

    const [newCookie] = await Cookie.create(
      [
        {
          name: name.trim(),
          description: description.trim(),
          images: [
            {
              url: uploadedImage.url || uploadedImage.secure_url,
              public_id: uploadedImage.public_id,
            },
          ],
          category: category.trim(),
          ingredients: Array.isArray(ingredients) ? ingredients : [],
          isFeatured: Boolean(isFeatured === true || isFeatured === "true"),
          isActive: isActive === undefined ? true : Boolean(isActive === true || isActive === "true"),
        },
      ],
      { session },
    );

    createdCookie = newCookie;

    if (Array.isArray(variants) && variants.length > 0) {
      const variantsToInsert = variants.map((variant) => ({
        cookieId: createdCookie._id,
        weight: variant.weight.trim(),
        price: Number(variant.price),
        discountPrice: variant.discountPrice !== undefined && variant.discountPrice !== "" ? Number(variant.discountPrice) : undefined,
        stock: Math.max(0, Number(variant.stock) || 0),
        isAvailable: variant.isAvailable !== false && variant.isAvailable !== "false",
        sku: `${createdCookie.name}-${variant.weight}`
          .replace(/\s+/g, "-")
          .toUpperCase(),
      }));

      createdVariants = await CookieVariant.insertMany(variantsToInsert, { session });
    }

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }

  return res.status(201).json({
    success: true,
    message: "Cookie created successfully",
    cookie: {
      ...createdCookie.toObject(),
      variants: createdVariants,
    },
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

      originalCookie.variants?.forEach((variant) => {
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
  let { name, description, category, ingredients, variants, isFeatured, isActive } = req.body;

  const cookie = await Cookie.findById(id);
  if (!cookie) {
    return res.status(404).json({
      success: false,
      message: constants.COOKIE_NOT_FOUND,
    });
  }

  // Parse if JSON strings
  if (typeof ingredients === "string") {
    try {
      ingredients = JSON.parse(ingredients);
    } catch {
      ingredients = ingredients.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  if (typeof variants === "string") {
    try {
      variants = JSON.parse(variants);
    } catch {
      variants = [];
    }
  }

  // If a new image was uploaded
  if (req.file && req.file.path) {
    const uploadedImage = await uploadOnCloudinary(req.file.path);
    if (uploadedImage) {
      cookie.images = [
        {
          url: uploadedImage.url || uploadedImage.secure_url,
          public_id: uploadedImage.public_id,
        },
      ];
    }
  }

  if (name !== undefined) cookie.name = name.trim();
  if (description !== undefined) cookie.description = description.trim();
  if (category !== undefined) cookie.category = category.trim();
  if (ingredients !== undefined && Array.isArray(ingredients)) cookie.ingredients = ingredients;
  if (isFeatured !== undefined) cookie.isFeatured = Boolean(isFeatured === true || isFeatured === "true");
  if (isActive !== undefined) cookie.isActive = Boolean(isActive === true || isActive === "true");

  await cookie.save();

  // If variants are supplied, synchronize variants
  if (Array.isArray(variants) && variants.length > 0) {
    const currentVariants = await CookieVariant.find({ cookieId: cookie._id });
    const currentVariantMap = new Map(currentVariants.map((v) => [String(v._id), v]));

    for (const v of variants) {
      if (v._id && currentVariantMap.has(String(v._id))) {
        // Update existing variant
        const existing = currentVariantMap.get(String(v._id));
        existing.weight = v.weight !== undefined ? v.weight.trim() : existing.weight;
        existing.price = v.price !== undefined ? Number(v.price) : existing.price;
        existing.discountPrice = v.discountPrice !== undefined && v.discountPrice !== "" ? Number(v.discountPrice) : undefined;
        existing.stock = v.stock !== undefined ? Math.max(0, Number(v.stock)) : existing.stock;
        existing.isAvailable = v.isAvailable !== undefined ? Boolean(v.isAvailable === true || v.isAvailable === "true") : existing.isAvailable;
        existing.sku = `${cookie.name}-${existing.weight}`.replace(/\s+/g, "-").toUpperCase();
        await existing.save();
        currentVariantMap.delete(String(v._id));
      } else {
        // Create new variant
        await CookieVariant.create({
          cookieId: cookie._id,
          weight: v.weight.trim(),
          price: Number(v.price),
          discountPrice: v.discountPrice !== undefined && v.discountPrice !== "" ? Number(v.discountPrice) : undefined,
          stock: Math.max(0, Number(v.stock) || 0),
          isAvailable: v.isAvailable !== false && v.isAvailable !== "false",
          sku: `${cookie.name}-${v.weight}`.replace(/\s+/g, "-").toUpperCase(),
        });
      }
    }

    // Delete removed variants that are no longer in the list
    if (currentVariantMap.size > 0) {
      const idsToDelete = Array.from(currentVariantMap.keys());
      await CookieVariant.deleteMany({ _id: { $in: idsToDelete } });
    }
  }

  const updatedVariants = await CookieVariant.find({ cookieId: cookie._id });

  return res.status(200).json({
    success: true,
    message: "Cookie updated successfully",
    cookie: {
      ...cookie.toObject(),
      variants: updatedVariants,
    },
  });
});

export const updateVariantStock = asyncHandler(async (req, res) => {
  const { variantId } = req.params;
  const { stock, change } = req.body;

  const variant = await CookieVariant.findById(variantId);
  if (!variant) {
    return res.status(404).json({
      success: false,
      message: "Variant not found",
    });
  }

  if (change !== undefined) {
    const delta = Number(change) || 0;
    variant.stock = Math.max(0, variant.stock + delta);
  } else if (stock !== undefined) {
    variant.stock = Math.max(0, Number(stock));
  }

  // Update availability based on stock
  if (variant.stock === 0) {
    variant.isAvailable = false;
  } else if (variant.stock > 0 && !variant.isAvailable) {
    variant.isAvailable = true;
  }

  await variant.save();

  return res.status(200).json({
    success: true,
    message: `Stock updated for ${variant.sku || variant.weight}`,
    variant,
  });
});

export const toggleCookieFeatured = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cookie = await Cookie.findById(id);

  if (!cookie) {
    return res.status(404).json({
      success: false,
      message: constants.COOKIE_NOT_FOUND,
    });
  }

  cookie.isFeatured = !cookie.isFeatured;
  await cookie.save();

  return res.status(200).json({
    success: true,
    message: cookie.isFeatured
      ? `"${cookie.name}" is now featured on the homepage.`
      : `"${cookie.name}" is no longer featured.`,
    isFeatured: cookie.isFeatured,
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

  const updatedCookie = await Cookie.findByIdAndUpdate(id, dataToUpdate, { new: true });

  return res.status(200).json({
    success: true,
    message: `Cookie marked as ${newStatus ? "Active" : "Inactive"}`,
    cookie: updatedCookie,
  });
});

export const getCookies = asyncHandler(async (req, res) => {
  const {
    isActive,
    category,
    isFeatured,
    search,
    slug,
    page = 1,
    limit = 100,
  } = { ...req.query, ...req.body };

  const query = {
    isDeleted: { $ne: true },
  };

  if (isActive !== undefined && isActive !== "" && isActive !== "all") {
    query.isActive = isActive === true || isActive === "true";
  }

  if (isFeatured !== undefined && isFeatured !== "" && isFeatured !== "all") {
    query.isFeatured = isFeatured === true || isFeatured === "true";
  }

  if (category && category !== "all") {
    if (mongoose.isValidObjectId(category)) {
      query.category = category;
    } else {
      const foundCategory = await Category.findOne({
        name: { $regex: new RegExp(`^${category}$`, "i") },
      });
      if (foundCategory) {
        query.category = foundCategory._id;
      }
    }
  }

  if (slug) {
    query.slug = slug.trim();
  }

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");
    query.$or = [
      { name: searchRegex },
      { description: searchRegex },
      { ingredients: searchRegex },
    ];
  }

  // Fetch cookies with category populated
  const cookies = await Cookie.find(query)
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .lean();

  // Fetch variants for all returned cookies
  const cookieIds = cookies.map((c) => c._id);
  const variants = await CookieVariant.find({ cookieId: { $in: cookieIds } }).lean();

  const variantMap = {};
  variants.forEach((v) => {
    const cid = String(v.cookieId);
    if (!variantMap[cid]) variantMap[cid] = [];
    variantMap[cid].push(v);
  });

  const cookiesWithVariants = cookies.map((c) => {
    const cookieVariants = variantMap[String(c._id)] || [];
    const totalStock = cookieVariants.reduce((sum, v) => sum + (v.stock || 0), 0);
    const minPrice = cookieVariants.length > 0 ? Math.min(...cookieVariants.map((v) => v.discountPrice || v.price)) : 0;
    const maxPrice = cookieVariants.length > 0 ? Math.max(...cookieVariants.map((v) => v.price)) : 0;

    return {
      ...c,
      variants: cookieVariants,
      totalStock,
      minPrice,
      maxPrice,
    };
  });

  // Calculate high-level product stats across entire catalog
  const [allCookiesCount, activeCookiesCount, allVariants] = await Promise.all([
    Cookie.countDocuments({ isDeleted: { $ne: true } }),
    Cookie.countDocuments({ isDeleted: { $ne: true }, isActive: true }),
    CookieVariant.find().select("stock cookieId isAvailable").lean(),
  ]);

  const totalStockUnits = allVariants.reduce((sum, v) => sum + (v.stock || 0), 0);
  const lowStockCount = allVariants.filter((v) => v.stock > 0 && v.stock <= 5).length;
  const outOfStockCount = allVariants.filter((v) => v.stock === 0).length;
  const featuredCount = await Cookie.countDocuments({ isDeleted: { $ne: true }, isFeatured: true });

  const stats = {
    totalProducts: allCookiesCount,
    activeProducts: activeCookiesCount,
    totalStockUnits,
    lowStockCount,
    outOfStockCount,
    featuredCount,
  };

  return res.status(200).json({
    success: true,
    message: "Cookies fetched successfully",
    cookies: cookiesWithVariants,
    data: cookiesWithVariants,
    stats,
    pagination: {
      totalDocs: cookies.length,
      totalPages: 1,
      page: Number(page),
      limit: Number(limit),
    },
  });
});

export const getCookie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cookie = await Cookie.findById(id, "-__v -updatedAt")
    .populate("category", "name slug")
    .lean();

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

