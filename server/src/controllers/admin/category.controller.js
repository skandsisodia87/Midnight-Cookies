import constants from "../../constants/constants.js";
import Category from "../../models/category.model.js";
import Cookie from "../../models/cookie.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../services/cloudinary.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description } = req.body;

  const file = req.file;
  if (!file || !file.path) {
    return res.status(400).json({
      success: false,
      message: constants.IMAGE_NOT_FOUND,
    });
  }

  const existingCategory = await Category.findOne({
    $or: [{ name }, { slug }],
  });

  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: "Category already exists",
    });
  }

  const image = await uploadOnCloudinary(file.path);

  const newCategory = new Category({
    name,
    slug,
    description,
    image: image.url,
    public_key: image.public_id,
  });

  await newCategory.save();

  return res
    .status(200)
    .json({ success: true, message: "Category created successfully" });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, slug, description, isActive } = req.body;

  const dataToUpdate = {};

  if (name) dataToUpdate.name = name;
  if (slug) dataToUpdate.slug = slug;
  if (description) dataToUpdate.description = description;
  if (isActive !== undefined || isActive !== null)
    dataToUpdate.isActive = isActive;

  const category = await Category.findByIdAndUpdate(
    id,
    {
      $set: dataToUpdate,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!category) {
    return res.status(404).json({
      success: false,
      message: constants.CATEGORY_NOT_FOUND,
    });
  }

  return res
    .status(200)
    .json({ success: true, message: "Category updated successfully." });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})
    .select("name slug description image isDefault isActive")
    .sort({ createdAt: 1 });

  return res.status(200).json({
    success: true,
    message: "Categories fetched successfully.",
    categories,
  });
});

export const getActiveCategories = asyncHandler(async (_req, res) => {
  const categories = await Category.aggregate([
    {
      $match: {
        isActive: true,
      },
    },
    {
      $lookup: {
        from: "cookies",
        let: { categoryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$category", "$$categoryId"] },
              isActive: true,
              isDeleted: false,
            },
          },
          { $limit: 1 },
        ],
        as: "cookies",
      },
    },
    {
      $match: {
        "cookies.0": { $exists: true },
      },
    },
    {
      $project: {
        name: 1,
        slug: 1,
        description: 1,
        image: 1,
        isDefault: 1,
        isActive: 1,
        sortOrder: 1,
        createdAt: 1,
      },
    },
    {
      $sort: {
        sortOrder: 1,
        createdAt: 1,
      },
    },
  ]);

  return res.status(200).json({
    success: true,
    message: "Active categories fetched successfully.",
    categories,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: constants.CATEGORY_NOT_FOUND,
    });
  }

  if (category.public_key) {
    await deleteFromCloudinary(category.public_key);
  }

  await category.deleteOne();

  // Update category of cookies
  // const defaultCategory = await Category.findOne({ isDefault: true }).lean();
  // await Cookie.updateMany(
  //   { category: id },
  //   {
  //     $set: {
  //       category: defaultCategory._id,
  //     },
  //   },
  // );

  return res.status(200).json({
    success: true,
    message: "Category deleted successfully.",
  });
});
