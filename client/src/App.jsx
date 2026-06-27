import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { toast } from "sonner";
import Home from "./components/pages/Home";

const Login = lazy(() => import("./components/pages/Login"));
const Register = lazy(() => import("./components/pages/Register"));
const ForgotPassword = lazy(() => import("./components/pages/ForgotPassword"));
const VerifyEmail = lazy(() => import("./components/pages/VerifyEmail"));
const Orders = lazy(() => import("./components/pages/Orders"));
const MainLayout = lazy(() => import("./components/pages/MainLayout"));
const OrderDetails = lazy(() => import("./components/pages/OrderDetails"));
const Cart = lazy(() => import("./components/pages/Cart"));
const Cookies = lazy(() => import("./components/pages/Cookies"));
const CookieDetails = lazy(() => import("./components/pages/CookiesDetails"));
const ResetPassword = lazy(() => import("./components/pages/ResetPassword"));
const CheckoutPage = lazy(() => import("./components/pages/Checkout"));
const Contact = lazy(() => import("./components/pages/Contact"));

import useAuthStore from "./store/authStore";
import VerifyEmailRoute from "./routes/VerifyEmailRoute";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoutes";
import { getCart } from "./services/cart.service";
import useCartStore from "./store/cartStore";
import LandingPageLoader from "./components/pages/LandingPageLoader";

const App = () => {
  const { isAuthenticated } = useAuthStore();
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

    if (isAuthenticated) {
      fetchCart();
    } else {
      clearCart();
      setError(null);
    }
  }, [isAuthenticated, setCartItems, clearCart, setError]);

  return (
    <Suspense fallback={<LandingPageLoader />}>
      <Routes>
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
      </Routes>
    </Suspense>
  );
};

export default App;
