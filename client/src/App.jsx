import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { toast } from "sonner";
import Home from "./pages/misc/Home";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));
const Orders = lazy(() => import("./pages/orders/Orders"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const OrderDetails = lazy(() => import("./pages/orders/OrderDetails"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Cookies = lazy(() => import("./pages/cookies/Cookies"));
const CookieDetails = lazy(() => import("./pages/cookies/CookiesDetails"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const CheckoutPage = lazy(() => import("./pages/cart/Checkout"));
const Contact = lazy(() => import("./pages/misc/Contact"));
const NotFound = lazy(() => import("./pages/misc/NotFound"));

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Products = lazy(() => import("./pages/admin/Products"));
const Categories = lazy(() => import("./pages/admin/Categories"));
const Coupons = lazy(() => import("./pages/admin/Coupons"));
const Newsletter = lazy(() => import("./pages/admin/Newsletter"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));
const EditOrder = lazy(() => import("./pages/admin/EditOrder"));
const AdminChatPage = lazy(() => import("./pages/admin/AdminChatPage"));

import useAuthStore from "./store/authStore";
import VerifyEmailRoute from "./routes/VerifyEmailRoute";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoutes";
import NonAdminRoute from "./routes/NonAdminRoute";
import { getCart } from "./services/cart.service";
import useCartStore from "./store/cartStore";
import LandingPageLoader from "./pages/misc/LandingPageLoader";
import AdminRoute from "./routes/AdminRoutes";
import AdminLayout from "./layouts/AdminLayout";
import constants from "./common/constants";

const App = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { setCartItems, clearCart, setError } = useCartStore();
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setCartLoading(true);
      setError(null);

      try {
        const data = await getCart();

        if (data?.success) {
          setCartItems(data.cart || []);
        } else {
          setError("Failed to load cart");
          toast.error("Failed to load your cart. Please refresh the page.");
        }
      } catch (error) {
        console.error("Cart fetch error:", error);
        setError("Failed to load cart");

        if (!error.response) {
          toast.error(
            "Network error. Unable to load cart. Please check your connection.",
          );
        } else if (error.response?.status === 401) {
          console.log("Cart fetch unauthorized");
        } else {
          toast.error(
            error.response?.data?.message ||
              "Failed to load your cart. Please try again.",
          );
        }
      } finally {
        setCartLoading(false);
      }
    };

    if (isAuthenticated && user.role !== "admin") {
      fetchCart();
    } else {
      clearCart();
      setError(null);
    }
  }, [isAuthenticated, setCartItems, clearCart, setError]);

  return (
    <Suspense fallback={<LandingPageLoader />}>
      <Routes>
        <Route element={<NonAdminRoute />}>
          <Route element={<MainLayout />}>
            <Route path={constants.ROUTES.HOME} element={<Home />} />
            <Route path={constants.ROUTES.CONTACT} element={<Contact />} />
            <Route path={constants.ROUTES.COOKIES} element={<Cookies />} />
            <Route
              path={constants.ROUTES.COOKIE_DETAILS}
              element={<CookieDetails />}
            />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path={constants.ROUTES.LOGIN} element={<Login />} />
            <Route path={constants.ROUTES.REGISTER} element={<Register />} />
            <Route
              path={constants.ROUTES.FORGOT_PASSWORD}
              element={<ForgotPassword />}
            />
            <Route
              path={constants.ROUTES.RESET_PASSWORD}
              element={<ResetPassword />}
            />
          </Route>

          <Route element={<VerifyEmailRoute />}>
            <Route
              path={constants.ROUTES.VERIFY_EMAIL}
              element={<VerifyEmail />}
            />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path={constants.ROUTES.CART} element={<Cart />} />
              <Route path={constants.ROUTES.ORDERS} element={<Orders />} />
              <Route
                path={constants.ROUTES.ORDER_DETAILS}
                element={<OrderDetails />}
              />
            </Route>
            <Route
              path={constants.ROUTES.CHECKOUT}
              element={<CheckoutPage />}
            />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route
              path={constants.ROUTES.ADMIN.DASHBOARD}
              element={<Dashboard />}
            />
            <Route
              path={constants.ROUTES.ADMIN.ORDERS}
              element={<AdminOrders />}
            />
            <Route
              path={constants.ROUTES.ADMIN.EDIT_ORDER}
              element={<EditOrder />}
            />
            <Route
              path={constants.ROUTES.ADMIN.CHAT}
              element={<AdminChatPage />}
            />
            <Route
              path={constants.ROUTES.ADMIN.PRODUCTS}
              element={<Products />}
            />
            <Route
              path={constants.ROUTES.ADMIN.CATEGORIES}
              element={<Categories />}
            />
            <Route
              path={constants.ROUTES.ADMIN.CUSTOMERS}
              element={<Customers />}
            />
            <Route
              path={constants.ROUTES.ADMIN.COUPONS}
              element={<Coupons />}
            />
            <Route
              path={constants.ROUTES.ADMIN.NEWSLETTER}
              element={<Newsletter />}
            />
            <Route
              path={constants.ROUTES.ADMIN.ANALYTICS}
              element={<Analytics />}
            />
            <Route
              path={constants.ROUTES.ADMIN.SETTINGS}
              element={<Settings />}
            />
          </Route>
        </Route>
        <Route
          path={constants.ROUTES.NOT_FOUND}
          element={<NotFound isAdmin={user?.role === constants.ADMIN} />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
