// import express from "express";

// import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { isAdmin } from "../middlewares/admin.middleware.js";

// import { getDashboard } from "../controllers/admin/dashboard.controller.js";

// import {
//   getProducts,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   updateProductStatus,
// } from "../controllers/admin/product.controller.js";

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

// import {
//   getCoupons,
//   createCoupon,
//   updateCoupon,
//   deleteCoupon,
// } from "../controllers/admin/coupon.controller.js";

// import {
//   getSubscribers,
//   deleteSubscriber,
// } from "../controllers/admin/newsletter.controller.js";

// import { getAnalytics } from "../controllers/admin/analytics.controller.js";

// const router = express.Router();


// router.use(verifyJWT);
// router.use(isAdmin);


// router.get("/dashboard", getDashboard);

// router.get("/products", getProducts);
// router.get("/products/:id", getProduct);
// router.post("/products", createProduct);
// router.patch("/products/:id", updateProduct);
// router.patch("/products/:id/status", updateProductStatus);
// router.delete("/products/:id", deleteProduct);


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


// router.get("/coupons", getCoupons);
// router.post("/coupons", createCoupon);
// router.patch("/coupons/:id", updateCoupon);
// router.delete("/coupons/:id", deleteCoupon);

// router.get("/newsletter", getSubscribers);
// router.delete("/newsletter/:id", deleteSubscriber);

// router.get("/analytics", getAnalytics);

// export default router;
