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
const Categories = lazy(() => import("./pages/admin/Categories.jsx"));
const Coupons = lazy(() => import("./pages/admin/Coupons"));
const Newsletter = lazy(() => import("./pages/admin/Newsletter"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));

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
import EditOrder from "./pages/admin/EditOrder";
import SocketTest from "./components/SocketTest.jsx";

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
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/cookies/:slug" element={<CookieDetails />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>

          <Route element={<VerifyEmailRoute />}>
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />
            </Route>
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/chat-bot" element={<SocketTest />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/orders/edit" element={<EditOrder />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/coupons" element={<Coupons />} />
            <Route path="/admin/newsletter" element={<Newsletter />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<NotFound isAdmin={user?.role === "admin"} />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
