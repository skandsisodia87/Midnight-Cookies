import Cart from "../models/cart.model.js";
import Cookie from "../models/cookie.model.js";

export const addToCart = async (req, res) => {
  try {
    const { cookieId, quantity = 1 } = req.body;

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
    const cart = await Cart.findOne({
      userId: req.user._id,
    }).populate({
      path: "items.cookieId",
      model: "Cookie",
      select: "name slug price discountPrice images stock category",
    });

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { cookieId } = req.params;

    const { quantity } = req.body;

    console.log(quantity);

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
