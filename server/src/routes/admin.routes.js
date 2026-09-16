import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { getDashboard } from "../controllers/admin/dashboard.controller.js";
import {
  getCookie,
  getCookies,
  createCookie,
  updateCookie,
  deleteCookie,
  bulkCreateCookies,
  softDeleteCookie,
  updateCookieStatus,
  toggleCookieFeatured,
  updateVariantStock,
} from "../controllers/admin/cookie.controller.js";
import {
  validate,
  validateObjectId,
  validateUserRole,
} from "../middleware/validation.middleware.js";
import {
  cookieSchema,
  updateCookieSchema,
} from "../validations/cookie.validation.js";
import {
  getOrders,
  getOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/admin/order.controller.js";
import {
  getCustomers,
  getCustomer,
  updateCustomerStatus,
  deleteCustomer,
} from "../controllers/admin/customer.controller.js";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/admin/category.controller.js";

import {
  getCoupons,
  toggleCouponStatus,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "../controllers/admin/coupon.controller.js";
import {
  couponSchema,
  updateCouponSchema,
} from "../validations/coupon.validation.js";
import {
  getSubscribers,
  sendNewsletter,
  removeSubscriber,
} from "../controllers/admin/newsletter.controller.js";
import { getAnalytics } from "../controllers/admin/analytics.controller.js";
import categorySchema from "../validations/category.validation.js";
import constants from "../constants/constants.js";
import {
  getDeliveryAgents,
  createDeliveryAgent,
  updateDeliveryAgent,
  deleteDeliveryAgent,
} from "../controllers/admin/deliveryAgent.controller.js";
import {
  deliveryAgentSchema,
  updateDeliveryAgentSchema,
} from "../validations/deliveryAgent.validation.js";

const router = express.Router();

router.use(verifyJWT);
router.use(validateUserRole(constants.ADMIN));

router.get("/dashboard", getDashboard);

router.get("/cookies", getCookies);
router.post("/cookies/search", getCookies);
router.get("/cookies/:id", validateObjectId(), getCookie);
router.post(
  "/cookies",
  upload.single("cookie_image"),
  validate(cookieSchema),
  createCookie,
);

router.patch(
  "/cookies/:id",
  validateObjectId(),
  upload.single("cookie_image"),
  validate(updateCookieSchema),
  updateCookie,
);
router.patch("/cookies/:id/status", validateObjectId(), updateCookieStatus);
router.patch("/cookies/:id/featured", validateObjectId(), toggleCookieFeatured);
router.patch("/cookies/variants/:variantId/stock", updateVariantStock);
router.delete("/cookies/:id", validateObjectId(), deleteCookie);
router.post("/bulk/cookies", bulkCreateCookies);
router.patch("/cookies/:id/soft-delete", softDeleteCookie);

router
  .route("/categories")
  .get(getCategories)
  .post(
    upload.single("category_image"),
    validate(categorySchema),
    createCategory,
  );
router
  .route("/categories/:id")
  .all(validateObjectId())
  .patch(updateCategory)
  .delete(deleteCategory);

router.post("/orders", getOrders);
router
  .route("/orders/:id")
  .all(validateObjectId())
  .get(getOrder)
  .patch(updateOrder)
  .delete(deleteOrder);
router.patch("/orders/:id/status", validateObjectId(), updateOrderStatus);

router
  .route("/delivery-agents")
  .get(getDeliveryAgents)
  .post(validate(deliveryAgentSchema), createDeliveryAgent);
router
  .route("/delivery-agents/:id")
  .all(validateObjectId())
  .patch(validate(updateDeliveryAgentSchema), updateDeliveryAgent)
  .delete(deleteDeliveryAgent);

router.get("/customers", getCustomers);
router
  .route("/customers/:id")
  .all(validateObjectId())
  .get(getCustomer)
  .delete(deleteCustomer);
router.patch("/customers/:id/status", validateObjectId(), updateCustomerStatus);

router.get("/coupons", getCoupons);
router.patch("/coupons/:id/status", validateObjectId(), toggleCouponStatus);
router.post("/coupons", validate(couponSchema), createCoupon);
router
  .route("/coupons/:id")
  .all(validateObjectId())
  .patch(validate(updateCouponSchema), updateCoupon)
  .delete(deleteCoupon);

router.post("/newsletter", getSubscribers);
router.post("/newsletter/send", sendNewsletter);
router.delete("/newsletter/:id", validateObjectId(), removeSubscriber);

router.get("/analytics", getAnalytics);

export default router;
