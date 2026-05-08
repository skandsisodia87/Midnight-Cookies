# Midnight Cookies Frontend UI Plan

## Recommended Stack

Use:

* React + Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Icons
* Framer Motion

Why Tailwind?

* Faster UI development
* Modern aesthetic
* Easier responsive design
* Better custom bakery/ecommerce styling
* Cleaner than Material UI for custom branding

---

# Recommended Color Palette

| Purpose         | Color   |
| --------------- | ------- |
| Primary         | #D98B2B |
| Dark Background | #1F140F |
| Card Background | #2A1C15 |
| Light Cream     | #FFF6EC |
| Accent          | #F5C16C |
| Text Dark       | #2B1D16 |
| Text Light      | #FFFFFF |

---

# Recommended Fonts

Use:

* Headings → Poppins
* Body → Inter

Install:

```bash
npm install @fontsource/poppins @fontsource/inter
```

---

# Suggested Folder Structure

```txt
src/
│
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   ├── home/
│   ├── cookies/
│   ├── cart/
│   └── ui/
│
├── pages/
│   ├── Home.jsx
│   ├── Cookies.jsx
│   ├── CookieDetails.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Orders.jsx
│   └── Admin/
│
├── routes/
├── services/
├── hooks/
├── context/
├── utils/
├── layouts/
└── App.jsx
```

---

# UI Components Needed

## Layout Components

* Navbar
* Footer
* Mobile Sidebar
* Loader
* Page Container

---

## Home Page Components

* Hero Section
* Featured Cookies
* Categories
* Why Choose Us
* Testimonials
* Newsletter Section

---

## Cookie Components

* Cookie Card
* Cookie Grid
* Rating Stars
* Quantity Selector
* Add To Cart Button

---

## Cart Components

* Cart Item Card
* Price Summary
* Checkout Form

---

## Authentication Components

* Login Form
* Register Form
* Password Input

---

## Admin Components

* Dashboard Cards
* Sidebar
* Tables
* Order Status Badge
* Create Cookie Form

---

# Install Tailwind CSS

```bash
npm install -D tailwindcss @tailwindcss/vite
```

---

# Configure Tailwind in `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

# Add Tailwind in `src/index.css`

```css
@import "tailwindcss";
```

---

# Recommended UI Style

Theme:

* Dark luxury bakery
* Soft shadows
* Rounded cards
* Large product images
* Smooth animations
* Warm colors
* Minimal but premium feel

Inspired by:

* Crumbl Cookies
* Starbucks Reserve
* Luxury bakery websites

---

# Homepage Layout

```txt
Navbar
↓
Hero Banner
↓
Featured Cookies
↓
Categories
↓
Why Choose Us
↓
Testimonials
↓
Newsletter
↓
Footer
```

---

# First UI Component — Navbar

Create:

```txt
src/components/layout/Navbar.jsx
```

```jsx
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="bg-[#1F140F] text-white px-6 py-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-[#F5C16C]"
        >
          Midnight Cookies
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-[#F5C16C] transition">
            Home
          </Link>

          <Link to="/cookies" className="hover:text-[#F5C16C] transition">
            Cookies
          </Link>

          <Link to="/orders" className="hover:text-[#F5C16C] transition">
            Orders
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="hidden md:block border border-[#D98B2B] px-4 py-2 rounded-full hover:bg-[#D98B2B] transition"
          >
            Login
          </Link>

          <Link
            to="/cart"
            className="relative"
          >
            <FiShoppingCart size={24} />

            <span className="absolute -top-2 -right-2 bg-[#D98B2B] text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

---

# Second UI Component — Hero Section

Create:

```txt
src/components/home/HeroSection.jsx
```

```jsx
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-[#1F140F] text-white min-h-[90vh] flex items-center px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Freshly
            <span className="text-[#D98B2B]"> Baked </span>
            Cookies
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-lg leading-8">
            Warm, soft and delicious cookies delivered straight to your doorstep.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-[#D98B2B] hover:bg-[#c97818] px-6 py-3 rounded-full font-semibold transition">
              Order Now
            </button>

            <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
              Explore Menu
            </button>
          </div>
        </motion.div>


        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e"
            alt="cookies"
            className="w-full max-w-md rounded-[40px] shadow-2xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
```

---

# Home Page Setup

Create:

```txt
src/pages/Home.jsx
```

```jsx
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";

const Home = () => {
  return (
    <div className="bg-[#FFF6EC] min-h-screen">
      <Navbar />

      <HeroSection />
    </div>
  );
};

export default Home;
```

---

# Next Recommended Components

After this build:

1. Featured Cookies Section
2. Cookie Card Component
3. Footer
4. Login/Register Pages
5. Cart UI
6. Admin Dashboard
7. Responsive Mobile Menu
8. Skeleton Loaders
9. Checkout Page
10. Orders Page

---

# UI Goal

The final UI should feel:

* warm
* premium
* cozy
* bakery themed
* modern ecommerce
* animation rich
* mobile friendly
* visually clean
* luxury dessert brand inspired
