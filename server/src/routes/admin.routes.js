import express from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";
import { getDashboard } from "../controllers/admin/dashboard.controller.js";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkCreateProduct,
  softDeleteProduct,
  updateProductStatus,
} from "../controllers/admin/product.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { productSchema } from "../validations/product.validation.js";

// import {
//   getOrders,
//   getOrder,
//   updateOrderStatus,
//   deleteOrder,
// } from "../controllers/admin/order.controller.js";

// import {
//   getCustomers,
//   getCustomer,
//   updateCustomerStatus,
//   deleteCustomer,
// } from "../controllers/admin/customer.controller.js";

// import {
//   getCategories,
//   createCategory,
//   updateCategory,
//   deleteCategory,
// } from "../controllers/admin/category.controller.js";

import {
  getCoupons,
  getCoupon,
  // createCoupon,
  // updateCoupon,
  // deleteCoupon,
} from "../controllers/admin/coupon.controller.js";
import validateObjectId from "../middleware/validateObjectId.js";

// import {
//   getSubscribers,
//   deleteSubscriber,
// } from "../controllers/admin/newsletter.controller.js";

// import { getAnalytics } from "../controllers/admin/analytics.controller.js";

const router = express.Router();

// router.use(verifyJWT);
// router.use(verifyAdmin);

router.get("/dashboard", getDashboard);

router.post("/products", getProducts);
router.get("/products/:id", validateObjectId(), getProduct);
router.post("/products", createProduct);
router.post(
  "/",
  verifyJWT,
  verifyAdmin,
  validate(productSchema),
  createProduct,
);
router.patch(
  "/products/:id",
  validateObjectId(),
  validate(productSchema),
  updateProduct,
);
router.patch("/products/:id/status", validateObjectId(), updateProductStatus);
router.delete("/products/:id", validateObjectId(), deleteProduct);
router.post("/bulk/products", bulkCreateProduct);
router.patch("/products/:id/soft-delete", softDeleteProduct);

// router.get("/categories", getCategories);
// router.post("/categories", createCategory);
// router.patch("/categories/:id", updateCategory);
// router.delete("/categories/:id", deleteCategory);

// router.get("/orders", getOrders);
// router.get("/orders/:id", getOrder);
// router.patch("/orders/:id/status", updateOrderStatus);
// router.delete("/orders/:id", deleteOrder);

// router.get("/customers", getCustomers);
// router.get("/customers/:id", getCustomer);
// router.patch("/customers/:id/status", updateCustomerStatus);
// router.delete("/customers/:id", deleteCustomer);

router.get("/coupons", getCoupons);
router.get("/coupons/:id", validateObjectId(), getCoupon);
// router.post("/coupons", createCoupon);
// router.patch("/coupons/:id", updateCoupon);
// router.delete("/coupons/:id", deleteCoupon);

// router.get("/newsletter", getSubscribers);
// router.delete("/newsletter/:id", deleteSubscriber);

// router.get("/analytics", getAnalytics);

export default router;
