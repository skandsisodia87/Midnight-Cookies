const constants = {
  APPICATION_NAME: "Midnight Cookies",

  ADMIN: "admin",
  USER: "user",
  USERS: "users",

  CUSTOMERS: "customers",
  C_CUSTOMERS: "Customers",
  PRODUCTS: "products",
  C_PRODUCTS: "Products",

  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  BAKING: "Baking",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",

  CONTACT_EMAIL: "fresh.midnight.cookies@gmail.com",
  CONTACT_PHONE: "+91 67123387446",
  LOCATION: "Ghaziabad, Uttar Pradesh, India",

  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  CONVERSATION: "conversation",

  ALL: "All",
  VERIFIED: "verified",
  GUEST: "guest",
  GUESTS: "guests",
  PENDING: "pending",

  NEWSLETTER: "newsletter",
  FEATURED_COOKIE: "featured-cookie",
  ANALYTICS: "analytics",
  ADMIN_CATEGORIES: "admin-categories",
  COUPONS: "coupons",
  ADMIN_CUSTOMERS: "admin-customers",
  DASHBOARD_DATA: "dashboard-data",
  ADMIN_ORDERS: "admin-orders",
  COOKIE_REVIEW: "cookie-review",

  ERROR_MSG: "Something went wrong",
  BACK_TO_DASHBOARD: "Back to Dashboard",

  ROUTES: {
    HOME: "/",
    CONTACT: "/contact",
    COOKIES: "/cookies",
    COOKIE_DETAILS: "/cookies/:slug",

    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password/:token",
    VERIFY_EMAIL: "/verify-email",

    CART: "/cart",
    ORDERS: "/orders",
    ORDER_DETAILS: "/orders/:orderId",
    CHECKOUT: "/checkout",

    ADMIN: {
      DASHBOARD: "/admin",
      ORDERS: "/admin/orders",
      EDIT_ORDER: "/admin/orders/edit",
      CHAT: "/admin/chat",
      PRODUCTS: "/admin/products",
      CATEGORIES: "/admin/categories",
      CUSTOMERS: "/admin/customers",
      COUPONS: "/admin/coupons",
      NEWSLETTER: "/admin/newsletter",
      ANALYTICS: "/admin/analytics",
      SETTINGS: "/admin/settings",
    },

    NOT_FOUND: "*",
  },
};

export default constants;
