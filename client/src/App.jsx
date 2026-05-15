import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ForgotPassword from "./components/pages/ForgotPassword";
import VerifyEmail from "./components/pages/VerifyEmail";
import Orders from "./components/pages/Orders";
import MainLayout from "./components/pages/MainLayout";
import OrderDetails from "./components/pages/OrderDetails";
import Cart from "./components/pages/Cart";
import Cookies from "./components/pages/Cookies";
import CookieDetails from "./components/pages/CookiesDetails";
import useAuthStore from "./store/authStore";
import VerifyEmailRoute from "./routes/VerifyEmailRoute";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoutes";
import ResetPassword from "./components/pages/ResetPassword";
import CheckoutPage from "./components/pages/Checkout";
import { getCart } from "./services/cart.service";
import useCartStore from "./store/cartStore";

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const { setCartItems, clearCart } = useCartStore();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();

        if (data?.success) {
          setCartItems(data.cart || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) {
      fetchCart();
    } else {
      clearCart();
    }
  }, [isAuthenticated, setCartItems, clearCart]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/cookies' element={<Cookies />} />
        <Route path='/cookies/:slug' element={<CookieDetails />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
      </Route>

      <Route element={<VerifyEmailRoute />}>
        <Route path='/verify-email' element={<VerifyEmail />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/orders/:orderId' element={<OrderDetails />} />
        </Route>
        <Route path='/Checkout' element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
};

export default App;
