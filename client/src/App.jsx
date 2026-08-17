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
  const routes = constants.ROUTES;
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

    if (isAuthenticated && user.role !== constants.ADMIN) {
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
            <Route path={routes.HOME} element={<Home />} />
            <Route path={routes.CONTACT} element={<Contact />} />
            <Route path={routes.COOKIES} element={<Cookies />} />
            <Route path={routes.COOKIE_DETAILS} element={<CookieDetails />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path={routes.LOGIN} element={<Login />} />
            <Route path={routes.REGISTER} element={<Register />} />
            <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
          </Route>

          <Route element={<VerifyEmailRoute />}>
            <Route path={routes.VERIFY_EMAIL} element={<VerifyEmail />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path={routes.CART} element={<Cart />} />
              <Route path={routes.ORDERS} element={<Orders />} />
              <Route path={routes.ORDER_DETAILS} element={<OrderDetails />} />
            </Route>
            <Route path={routes.CHECKOUT} element={<CheckoutPage />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path={routes.ADMIN.DASHBOARD} element={<Dashboard />} />
            <Route path={routes.ADMIN.ORDERS} element={<AdminOrders />} />
            <Route path={routes.ADMIN.EDIT_ORDER} element={<EditOrder />} />
            <Route path={routes.ADMIN.CHAT} element={<AdminChatPage />} />
            <Route path={routes.ADMIN.PRODUCTS} element={<Products />} />
            <Route path={routes.ADMIN.CATEGORIES} element={<Categories />} />
            <Route path={routes.ADMIN.CUSTOMERS} element={<Customers />} />
            <Route path={routes.ADMIN.COUPONS} element={<Coupons />} />
            <Route path={routes.ADMIN.NEWSLETTER} element={<Newsletter />} />
            <Route path={routes.ADMIN.ANALYTICS} element={<Analytics />} />
            <Route path={routes.ADMIN.SETTINGS} element={<Settings />} />
          </Route>
        </Route>
        <Route
          path={routes.NOT_FOUND}
          element={<NotFound isAdmin={user?.role === constants.ADMIN} />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
