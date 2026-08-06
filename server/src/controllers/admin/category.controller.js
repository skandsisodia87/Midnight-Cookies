import Category from "../../models/category.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../services/cloudinary.service.js";

export const createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    const file = req.file;
    if (!file || !file.path) {
      return res.status(400).json({
        success: false,
        message: "Image not found",
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, slug, description } = req.body;

    const dataToUpdate = {};

    if (name) dataToUpdate.name = name;
    if (slug) dataToUpdate.slug = slug;
    if (description) dataToUpdate.description = description;

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
        message: "Category not found.",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Category updated successfully." });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).select(
      "name slug description image ",
    );

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully.",
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (category.public_key) {
      await deleteFromCloudinary(category.public_key);
    }

    await category.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
