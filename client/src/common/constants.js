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
  ADMIN_PRODUCTS: "admin-products",
  COUPONS: "coupons",
  ADMIN_CUSTOMERS: "admin-customers",
  DASHBOARD_DATA: "dashboard-data",
  ADMIN_ORDERS: "admin-orders",
  COOKIE_REVIEW: "cookie-review",

  ERROR_MSG: "Something went wrong",
  BACK_TO_DASHBOARD: "Back to Dashboard",
  FAILED_TO_PLACE_ORDER: "Failed to place order",
  PLEASE_REFRESH_THE_PAGE: "Please refresh the page",

  CONNECT: "connect",
  DISCONNECT: "disconnect",
  CONNECT_ERROR: "connect_error",
  CONVERSATION_JOINED: "conversation_joined",
  USER_JOINED_CONVERSATION: "user_joined_conversation",
  USER_LEFT_CONVERSATION: "user_left_conversation",
  NEW_MESSAGE: "new_message",
  CHAT_ERROR: "chat_error",
  USER_TYPING: "user_typing",
  USER_STOP_TYPING: "user_stop_typing",
  STOP_TYPING: "stop_typing",
  SEND_MESSAGE: "send_message",
  LEAVE_CONVERSATION: "leave_conversation",
  JOIN_CONVERSATION: "join_conversation",
  TYPING: "typing",

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

  INPUT_CLASS:
    "w-full rounded-xl border border-[#E8D5C4] bg-[#FFFCF9] px-4 py-3 text-sm text-[#4E342E] outline-none transition focus:border-[#C77B30] focus:ring-2 focus:ring-[#C77B30]/10",
};

export default constants;
