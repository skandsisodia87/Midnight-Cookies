import Cookie from "../../models/cookie.model.js";
import CookieVariant from "../../models/cookieVariant.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, images, category, ingredients, variants } =
      req.body;

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
      images,
      category,
      ingredients,
    });

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

    await CookieVariant.insertMany(variantsToInsert);

    return res.status(201).json({
      success: true,
      message: "Cookie created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bulkCreateProduct = async (req, res) => {
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

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const cookie = await Cookie.findById(id);

    if (!cookie) {
      return res.status(404).json({
        success: false,
        message: "Cookie not found",
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
