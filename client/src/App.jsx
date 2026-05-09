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

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cookies' element={<Cookies />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/orders/:id' element={<OrderDetails />} />
        <Route path='/cookies/:slug' element={<CookieDetails />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/verify-email' element={<VerifyEmail />} />
    </Routes>
  );
};

export default App;
