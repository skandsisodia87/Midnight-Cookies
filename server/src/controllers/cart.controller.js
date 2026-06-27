import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Cookie from "../models/cookie.model.js";

export const addToCart = async (req, res) => {
  try {
    const { cookieId, quantity = 1, variantId } = req.body;

    if (!cookieId) {
      return res.status(400).json({
        success: false,
        message: "Cookie id is required",
      });
    }

    const cookie = await Cookie.findById(cookieId);

    if (!cookie) {
      return res.status(404).json({
        success: false,
        message: "Cookie not found",
      });
    }

    let cart = await Cart.findOne({
      userId: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        items: [
          {
            cookieId,
            quantity,
            variantId,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.cookieId.toString() === cookieId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          cookieId,
          quantity,
          variantId,
        });
      }
      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "cookies",
          localField: "items.cookieId",
          foreignField: "_id",
          as: "cookie",
          pipeline: [
            {
              $project: {
                name: 1,
                images: 1,
                category: 1,
                slug: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "cookievariants",
          localField: "items.variantId",
          foreignField: "_id",
          as: "variant",
          pipeline: [
            {
              $project: {
                weight: 1,
                sku: 1,
                price: 1,
                discountPrice: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$cookie",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$variant",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          cookieId: "$items.cookieId",
          variantId: "$items.variantId",
          quantity: "$items.quantity",
          name: "$cookie.name",
          slug: "$cookie.slug",
          category: "$cookie.category",
          image: {
            $arrayElemAt: ["$cookie.images", 0],
          },
          weight: "$variant.weight",
          originalPrice: "$variant.price",
          discountPrice: "$variant.discountPrice",
          finalPrice: {
            $ifNull: ["$variant.discountPrice", "$variant.price"],
          },
        },
      },
    ]);

    // Empty cart fallback
    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
          totalAmount: 0,
        },
      });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart.",
    });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { cookieId } = req.params;

    const { quantity } = req.body;

    if (!quantity) {
      return res.status(400).json({
        success: false,
        message: "Quantity is required",
      });
    }

    const cart = await Cart.findOne({
      userId: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.cookieId.toString() === cookieId,
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    item.quantity += quantity;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.cookieId.toString() !== cookieId,
      );
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartItemsQuantity = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one cart item update is required",
      });
    }

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    for (const update of items) {
      const { cookieId, quantity } = update;

      if (!cookieId || typeof quantity !== "number") {
        continue;
      }

      const item = cart.items.find(
        (cartItem) => cartItem.cookieId.toString() === cookieId.toString(),
      );

      if (!item) {
        continue;
      }

      if (quantity <= 0) {
        cart.items = cart.items.filter(
          (cartItem) => cartItem.cookieId.toString() !== cookieId.toString(),
        );
      } else {
        item.quantity = quantity;
      }
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { cookieId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.cookieId.toString() !== cookieId,
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
