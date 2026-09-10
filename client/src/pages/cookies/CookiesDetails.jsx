import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiStar,
  FiShare2,
  FiTruck,
  FiCheck,
  FiInfo,
  FiArrowLeft,
  FiAward,
  FiZap,
  FiX,
  FiMessageSquare,
  FiChevronRight,
  FiShoppingBag,
} from "react-icons/fi";

import { getAllCookies, getSingleCookie } from "../../services/cookie.service";
import { addToCart, emptyCart, getCart } from "../../services/cart.service";
import { createReview, getCookieReviews } from "../../services/review.service";
import CookieDetailsSkeleton from "../../components/cookies/CookieDetailsSkeleton";
import CookieCard from "../../components/cookies/CookieCard";
import placeholderCookie from "../../assets/images/placeholder-cookie.png";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import constants from "../../common/constants";

const CookieDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const { setCartItems, setError, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [cookie, setCookie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [variantIdx, setVariantIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("tasting");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewHoverRating, setReviewHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchCookie = async () => {
      try {
        setLoading(true);
        const data = await getSingleCookie(slug);
        setCookie(data.cookie);
        setActiveImageIdx(0);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load cookie details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCookie();
    }
  }, [slug]);

  useEffect(() => {
    setVariantIdx(0);
    setQuantity(1);
  }, [cookie]);

  useEffect(() => {
    setQuantity(1);
  }, [variantIdx]);

  // Fetch Reviews Query
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: [constants.COOKIE_REVIEW, cookie?._id],
    queryFn: () => getCookieReviews(cookie._id),
    enabled: !!cookie?._id,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch Related Cookies Query
  const { data: allCookiesData } = useQuery({
    queryKey: ["all-cookies-list"],
    queryFn: getAllCookies,
    staleTime: 15 * 60 * 1000,
  });

  // Filter 4 recommended cookies (exclude current)
  const relatedCookies = useMemo(() => {
    if (!allCookiesData?.cookies) return [];
    return allCookiesData.cookies
      .filter((c) => c._id !== cookie?._id)
      .slice(0, 4);
  }, [allCookiesData, cookie?._id]);

  // Computed variant & pricing
  const variants = cookie?.variants || [];
  const selectedVariant = variants[variantIdx] || variants[0] || {};
  const price = Number(selectedVariant?.price || 0);
  const discountPrice = Number(selectedVariant?.discountPrice || price);
  const savings = Math.max(0, price - discountPrice);
  const discountPercentage =
    price > discountPrice
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;
  const stock = selectedVariant?.stock ?? 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  // Rating Statistics breakdown
  const ratingStats = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
        avg: Number(cookie?.ratings || 0),
        total: cookie?.totalReviews || 0,
      };
    }
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const rounded = Math.round(r.rating);
      if (counts[rounded] !== undefined) {
        counts[rounded]++;
      }
    });
    return {
      ...counts,
      avg: Number(cookie?.ratings || 0),
      total: reviews.length,
    };
  }, [reviews, cookie?.ratings, cookie?.totalReviews]);

  // Gallery images array
  const images = useMemo(() => {
    if (cookie?.images && cookie.images.length > 0) {
      return cookie.images.map((img) =>
        typeof img === "string" ? img : img.url
      );
    }
    return [placeholderCookie];
  }, [cookie]);

  // Handlers
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: cookie?.name || "Midnight Cookies",
          text: `Check out ${cookie?.name} on Midnight Cookies! Freshly baked and heavenly.`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard! 📋");
      }
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard! 📋");
    }
  };

  const scrollToReviews = () => {
    const el = document.getElementById("reviews-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addToCartHandler = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to your cart");
      navigate(constants.ROUTES.LOGIN);
      return;
    }

    if (isOutOfStock) {
      toast.error("Sorry, this variant is currently out of stock");
      return;
    }

    try {
      setCartLoading(true);
      setError(null);

      const body = {
        cookieId: cookie._id,
        quantity,
        variantId: selectedVariant._id,
      };

      const data = await addToCart(body);

      if (data.success) {
        const cartData = await getCart();
        if (cartData.success) {
          setCartItems(cartData.cart || []);
          toast.success(
            `Added ${quantity}x ${cookie.name} (${selectedVariant.weight}) to cart! 🍪`
          );
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add item to cart");
      toast.error(
        error.response?.data?.message || "Failed to add item to cart"
      );
    } finally {
      setCartLoading(false);
    }
  };

  const buyNowHandler = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to continue with checkout");
      navigate(constants.ROUTES.LOGIN);
      return;
    }

    if (isOutOfStock) {
      toast.error("Sorry, this variant is currently out of stock");
      return;
    }

    try {
      setCartLoading(true);
      setError(null);

      clearCart();
      await emptyCart();

      const body = {
        cookieId: cookie._id,
        quantity,
        variantId: selectedVariant._id,
      };

      const data = await addToCart(body);

      if (data.success) {
        const cartData = await getCart();
        if (cartData.success) {
          setCartItems(cartData.cart || []);
          navigate(constants.ROUTES.CHECKOUT || constants.ROUTES.CART);
          toast.success("Proceeding to checkout 🛒");
        }
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to proceed with Buy Now"
      );
      toast.error(
        error.response?.data?.message || "Failed to proceed with Buy Now"
      );
    } finally {
      setCartLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to write a review");
      navigate(constants.ROUTES.LOGIN);
      return;
    }

    if (!reviewComment.trim()) {
      toast.error("Please enter your review feedback");
      return;
    }

    try {
      setSubmittingReview(true);
      const res = await createReview({
        cookieId: cookie._id,
        rating: reviewRating,
        review: reviewComment.trim(),
      });

      if (res.success) {
        toast.success("Thank you for your delicious review! ⭐");
        setIsReviewModalOpen(false);
        setReviewComment("");
        setReviewRating(5);
        queryClient.invalidateQueries([constants.COOKIE_REVIEW, cookie._id]);

        // Refresh cookie ratings
        const updated = await getSingleCookie(slug);
        if (updated?.cookie) {
          setCookie(updated.cookie);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return <CookieDetailsSkeleton />;
  }

  if (!cookie) {
    return (
      <div className="min-h-screen bg-[#FFF6EC] flex flex-col items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-xl text-center max-w-md border border-amber-100">
          <div className="text-6xl mb-4">🍪</div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2B1D16]">
            Cookie Not Found
          </h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
            The cookie you are looking for might have been eaten or is no longer
            available.
          </p>
          <Link
            to="/cookies"
            className="mt-6 inline-flex items-center justify-center gap-2 bg-[#D98B2B] hover:bg-[#c97818] text-white px-6 py-3 rounded-full font-semibold transition shadow-lg shadow-amber-500/20"
          >
            <FiArrowLeft /> Browse All Cookies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF6EC] text-[#2B1D16] selection:bg-amber-200">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-amber-200/50">
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-900/70 overflow-x-auto whitespace-nowrap py-1">
            <Link
              to="/"
              className="hover:text-[#D98B2B] transition-colors flex items-center gap-1"
            >
              Home
            </Link>
            <FiChevronRight className="text-amber-400 shrink-0" size={14} />
            <Link
              to="/cookies"
              className="hover:text-[#D98B2B] transition-colors flex items-center gap-1"
            >
              Cookies
            </Link>
            {cookie?.category?.name && (
              <>
                <FiChevronRight
                  className="text-amber-400 shrink-0"
                  size={14}
                />
                <span className="text-amber-900/60">
                  {cookie.category.name}
                </span>
              </>
            )}
            <FiChevronRight className="text-amber-400 shrink-0" size={14} />
            <span className="text-[#2B1D16] font-semibold truncate max-w-40 sm:max-w-xs">
              {cookie.name}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share this cookie"
              className="p-2.5 rounded-full bg-white/80 border border-amber-200 text-gray-700 hover:text-[#D98B2B] hover:bg-amber-50 transition duration-200 cursor-pointer"
            >
              <FiShare2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <div className="relative group bg-white rounded-3xl sm:rounded-[36px] overflow-hidden shadow-xl shadow-amber-950/5 border border-amber-100 aspect-square flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIdx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  src={images[activeImageIdx] || placeholderCookie}
                  alt={cookie.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {cookie?.category?.name && (
                <span className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-[#2B1D16]/90 backdrop-blur-md text-amber-200 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md tracking-wide">
                  {cookie.category.name}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide pt-1 px-2">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${activeImageIdx === idx
                      ? "border-[#D98B2B] ring-2 ring-amber-400/40 scale-105 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100 hover:border-amber-200"
                      }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${cookie.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="hidden sm:grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-sm">
                <div className="p-2.5 rounded-xl bg-amber-100 text-[#D98B2B] shrink-0">
                  <FiTruck size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2B1D16]">
                    Midnight Delivery
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    Delivered warm in 30-45m
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-sm">
                <div className="p-2.5 rounded-xl bg-amber-100 text-[#D98B2B] shrink-0">
                  <FiAward size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2B1D16]">
                    Artisanal Recipe
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    Real Belgian Chocolate
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={scrollToReviews}
                  className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-[#2B1D16] border border-amber-200 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                  <FiStar
                    className="fill-amber-500 text-amber-500"
                    size={15}
                  />
                  <span className="font-bold">
                    {cookie?.ratings || "0.0"}
                  </span>
                  <span className="text-gray-500">
                    ({cookie?.totalReviews || 0} reviews)
                  </span>
                </button>

                {isOutOfStock ? (
                  <span className="bg-red-50 text-red-600 border border-red-200 text-xs font-bold px-3 py-1 rounded-full">
                    Out of Stock
                  </span>
                ) : isLowStock ? (
                  <span className="bg-orange-50 text-orange-600 border border-orange-200 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    🔥 Only {stock} left in batch
                  </span>
                ) : (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <FiCheck size={12} /> In Stock & Fresh
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B1D16] tracking-tight leading-[1.15]">
                {cookie?.name}
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed pt-1">
                {cookie?.description}
              </p>
            </div>

            <div className="bg-linear-to-r from-amber-500/10 via-amber-200/20 to-transparent p-4 sm:p-5 rounded-3xl border border-amber-200/70 space-y-1">
              <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#D98B2B]">
                  ₹{discountPrice}
                </span>

                {savings > 0 && (
                  <span className="text-xl sm:text-2xl text-gray-400 line-through font-medium">
                    ₹{price}
                  </span>
                )}

                {savings > 0 && (
                  <span className="bg-[#D98B2B] text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                    Save ₹{savings} ({discountPercentage}% OFF)
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-500 pt-1">
                Price inclusive of all taxes • Freshly sealed pack
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm sm:text-base font-bold text-[#2B1D16] flex items-center gap-2">
                  <span>Select Weight & Pack</span>
                  <span className="text-xs font-normal text-gray-500">
                    ({selectedVariant?.weight || "Standard pack"})
                  </span>
                </label>
              </div>

              {variants.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {variants.map((v, idx) => {
                    const isSelected = idx === variantIdx;
                    return (
                      <button
                        key={v._id || idx}
                        type="button"
                        onClick={() => setVariantIdx(idx)}
                        className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${isSelected
                          ? "bg-amber-50 border-[#D98B2B] shadow-md shadow-amber-500/10 ring-2 ring-amber-300/40 scale-[1.02]"
                          : "bg-white border-amber-100 hover:border-amber-300 hover:bg-amber-50/50"
                          }`}
                      >
                        <span
                          className={`text-sm sm:text-base font-bold ${isSelected ? "text-[#D98B2B]" : "text-[#2B1D16]"
                            }`}
                        >
                          {v.weight}
                        </span>
                        <div className="mt-1 flex items-baseline gap-1.5">
                          <span className="text-xs sm:text-sm font-bold text-gray-900">
                            ₹{v.discountPrice || v.price}
                          </span>
                          {v.price > v.discountPrice && (
                            <span className="text-[11px] text-gray-400 line-through">
                              ₹{v.price}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1">
                          {v.stock > 0 ? `${v.stock} in stock` : "Sold out"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white px-4 py-3 rounded-2xl border border-amber-200 inline-block font-semibold text-sm">
                  Standard 500g Pack
                </div>
              )}
            </div>

            {cookie?.ingredients && cookie.ingredients.length > 0 && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Key Ingredients
                </label>
                <div className="flex flex-wrap gap-2">
                  {cookie.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="bg-white/80 border border-amber-200/80 text-amber-950 px-3 py-1 rounded-full text-xs font-medium shadow-2xs hover:bg-amber-100/60 transition"
                    >
                      ✨ {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
                <div className="flex items-center bg-white rounded-full border border-amber-200 p-1.5 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[#2B1D16] hover:bg-amber-100 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    title="Decrease quantity"
                  >
                    <FiMinus size={16} />
                  </button>

                  <span className="w-12 text-center text-lg font-black text-[#2B1D16]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(stock || 99, q + 1))
                    }
                    disabled={quantity >= stock || isOutOfStock}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-[#D98B2B] text-white hover:bg-[#c97818] transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                    title="Increase quantity"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>

                <div className="text-sm font-medium text-gray-600 pl-1">
                  Item Total:{" "}
                  <span className="font-bold text-[#2B1D16] text-base">
                    ₹{discountPrice * quantity}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {isAuthenticated ? (
                  <>
                    <button
                      type="button"
                      onClick={addToCartHandler}
                      disabled={cartLoading || isOutOfStock}
                      className={`flex-1 py-4 sm:py-4.5 px-6 rounded-full font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-200 shadow-lg cursor-pointer ${cartLoading || isOutOfStock
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                        : "bg-[#D98B2B] hover:bg-[#c97818] text-white shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01]"
                        }`}
                    >
                      <FiShoppingCart size={20} />
                      {cartLoading
                        ? "Adding to Cart..."
                        : isOutOfStock
                          ? "Out of Stock"
                          : "Add to Cart"}
                    </button>

                    <button
                      type="button"
                      onClick={buyNowHandler}
                      disabled={cartLoading || isOutOfStock}
                      className={`flex-1 py-4 sm:py-4.5 px-6 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border-2 ${cartLoading || isOutOfStock
                        ? "border-gray-300 text-gray-400 cursor-not-allowed"
                        : "border-[#2B1D16] bg-[#2B1D16] text-white hover:bg-black hover:border-black shadow-lg shadow-black/10 hover:scale-[1.01]"
                        }`}
                    >
                      <FiZap size={18} />
                      {cartLoading ? "Processing..." : "Buy Now"}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate(constants.ROUTES.LOGIN)}
                    className="w-full py-4.5 px-6 rounded-full font-bold text-base bg-[#D98B2B] hover:bg-[#c97818] text-white flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/25 transition cursor-pointer"
                  >
                    <FiShoppingBag size={20} />
                    Login to Order Fresh Cookies
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-amber-200/50">
              <div className="bg-white/60 p-3.5 rounded-2xl border border-amber-100 flex items-start gap-2.5">
                <span className="text-xl">🍪</span>
                <div>
                  <h4 className="text-xs font-bold text-[#2B1D16]">
                    Molten Center
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    Microwave 15s for warm bliss
                  </p>
                </div>
              </div>

              <div className="bg-white/60 p-3.5 rounded-2xl border border-amber-100 flex items-start gap-2.5">
                <span className="text-xl">🌿</span>
                <div>
                  <h4 className="text-xs font-bold text-[#2B1D16]">
                    100% Pure
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    Zero artificial preservatives
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 sm:mt-24 pt-6 border-t border-amber-200/60">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 scrollbar-hide border-b border-amber-200/60">
            {[
              { id: "tasting", label: "Tasting & Story", icon: "🍪" },
              {
                id: "ingredients",
                label: "Ingredients & Allergens",
                icon: "🌾",
              },
              { id: "reheating", label: "Reheating & Storage", icon: "♨️" },
              { id: "delivery", label: "Freshness & Delivery", icon: "🚚" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeTab === tab.id
                  ? "bg-[#2B1D16] text-white shadow-md"
                  : "bg-white/70 text-gray-700 hover:bg-amber-100/60 border border-amber-100"
                  }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === "tasting" && (
                <motion.div
                  key="tasting"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm space-y-5"
                >
                  <h3 className="text-xl sm:text-2xl font-black text-[#2B1D16]">
                    The Midnight Experience
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    {cookie?.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-amber-100">
                    <div className="bg-[#FFF6EC] p-4 rounded-2xl">
                      <span className="text-amber-800 font-bold text-sm block">
                        Outer Texture
                      </span>
                      <p className="text-xs text-gray-600 mt-1">
                        Golden-crisp edges caramelized to perfection.
                      </p>
                    </div>
                    <div className="bg-[#FFF6EC] p-4 rounded-2xl">
                      <span className="text-amber-800 font-bold text-sm block">
                        Center Texture
                      </span>
                      <p className="text-xs text-gray-600 mt-1">
                        Dense, buttery, gooey chocolate center that melts in
                        your mouth.
                      </p>
                    </div>
                    <div className="bg-[#FFF6EC] p-4 rounded-2xl">
                      <span className="text-amber-800 font-bold text-sm block">
                        Aroma
                      </span>
                      <p className="text-xs text-gray-600 mt-1">
                        Warm vanilla, roasted cocoa notes, and toasted brown
                        sugar.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "ingredients" && (
                <motion.div
                  key="ingredients"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm space-y-6"
                >
                  <h3 className="text-xl sm:text-2xl font-black text-[#2B1D16]">
                    Artisan Ingredients & Allergens
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {cookie?.ingredients && cookie.ingredients.length > 0 ? (
                      cookie.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="bg-[#FFF6EC] text-[#2B1D16] border border-amber-200 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
                        >
                          🍪 {ing}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">
                        Flour, Pure Dairy Butter, Dark Belgian Chocolate
                        Chunks, Cane Sugar, Sea Salt, Vanilla.
                      </p>
                    )}
                  </div>

                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
                    <FiInfo
                      className="text-[#D98B2B] shrink-0 mt-0.5"
                      size={20}
                    />
                    <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      <strong className="text-[#2B1D16]">
                        Allergen Notice:
                      </strong>{" "}
                      Baked in a facility that handles dairy, gluten, and tree
                      nuts. 100% Vegetarian & Eggless recipe.
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "reheating" && (
                <motion.div
                  key="reheating"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm space-y-6"
                >
                  <h3 className="text-xl sm:text-2xl font-black text-[#2B1D16]">
                    How To Enjoy Warm & Molten
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-linear-to-br from-amber-50 to-[#FFF6EC] border border-amber-200">
                      <span className="text-2xl mb-2 block">
                        ⚡ Microwave (Recommended)
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Place cookie on a microwave-safe plate and heat for{" "}
                        <strong>12-15 seconds</strong>. The chocolate chips
                        will turn molten and the center becomes gooey bliss!
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-linear-to-br from-amber-50 to-[#FFF6EC] border border-amber-200">
                      <span className="text-2xl mb-2 block">
                        ♨️ Oven / Air Fryer
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Preheat to 160°C (320°F) and warm for{" "}
                        <strong>2-3 minutes</strong> for an extra crispy edge
                        with a steaming soft center.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500">
                    💡 <strong>Storage:</strong> Store at room temperature in
                    an airtight container for up to 7 days, or freeze for up to
                    30 days.
                  </p>
                </motion.div>
              )}

              {activeTab === "delivery" && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm space-y-6"
                >
                  <h3 className="text-xl sm:text-2xl font-black text-[#2B1D16]">
                    Midnight Freshness Guarantee
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#FFF6EC] p-4 rounded-2xl border border-amber-100">
                      <span className="text-xl">🌙</span>
                      <h4 className="font-bold text-sm text-[#2B1D16] mt-2">
                        Midnight Cravings
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Active late-night delivery so you never sleep on an
                        empty cookie craving.
                      </p>
                    </div>

                    <div className="bg-[#FFF6EC] p-4 rounded-2xl border border-amber-100">
                      <span className="text-xl">📦</span>
                      <h4 className="font-bold text-sm text-[#2B1D16] ">
                        Insulated Boxes
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Shipped in food-safe insulated packaging to preserve
                        oven aroma and moisture.
                      </p>
                    </div>

                    <div className="bg-[#FFF6EC] p-4 rounded-2xl border border-amber-100">
                      <span className="text-xl">✨</span>
                      <h4 className="font-bold text-sm text-[#2B1D16] mt-2">
                        100% Satisfaction
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        If your cookies arrive less than perfect, we bake you a
                        fresh batch on the house.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <section
          id="reviews-section"
          className="mt-12 sm:mt-16 pt-8 border-t border-amber-200/60"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B1D16]">
                Customer Reviews 🍪
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                Real feedback from real cookie lovers.
              </p>
            </div>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  toast.error("Please login to write a review");
                  navigate(constants.ROUTES.LOGIN);
                } else {
                  setIsReviewModalOpen(true);
                }
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#D98B2B] hover:bg-[#c97818] text-white px-6 py-3 rounded-full font-bold text-sm shadow-md shadow-amber-500/20 transition cursor-pointer self-start sm:self-auto"
            >
              <FiMessageSquare size={16} /> Write a Review
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-md mb-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 text-center md:text-left md:border-r border-amber-100 md:pr-8">
              <span className="text-5xl sm:text-6xl font-black text-[#2B1D16] tracking-tight">
                {cookie?.ratings || "0.0"}
              </span>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500 my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    size={20}
                    className={
                      star <= Math.round(Number(cookie?.ratings || 0))
                        ? "fill-amber-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-500">
                Based on {reviews?.length || cookie?.totalReviews || 0}{" "}
                verified customer reviews
              </p>
            </div>

            <div className="md:col-span-8 space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratingStats[stars] || 0;
                const total = ratingStats.total || 1;
                const percent = Math.round((count / total) * 100);
                return (
                  <div
                    key={stars}
                    className="flex items-center gap-3 text-xs sm:text-sm"
                  >
                    <span className="w-10 font-bold text-gray-700 flex items-center gap-1">
                      {stars}{" "}
                      <FiStar
                        size={12}
                        className="fill-amber-500 text-amber-500"
                      />
                    </span>
                    <div className="flex-1 h-2.5 bg-amber-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D98B2B] rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-gray-500 font-medium">
                      {count} ({percent}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {reviewsLoading ? (
            <div className="space-y-4">
              <div className="h-24 bg-white/60 animate-pulse rounded-2xl" />
              <div className="h-24 bg-white/60 animate-pulse rounded-2xl" />
            </div>
          ) : reviews?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-100 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                          {review?.userId?.name?.charAt(0)?.toUpperCase() ||
                            "U"}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#2B1D16] text-sm sm:text-base">
                            {review?.userId?.name || "Verified Cookie Lover"}
                          </h4>
                          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                            <FiCheck size={11} /> Verified Order
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        <FiStar size={13} className="fill-amber-500" />
                        <span className="text-xs font-bold ml-1">
                          {review.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed pt-1">
                      "{review?.review}"
                    </p>
                  </div>

                  <span className="text-[11px] text-gray-400 mt-4 block">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )
                      : "Recent"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/80 rounded-3xl p-8 sm:p-12 text-center border border-amber-100 max-w-xl mx-auto shadow-sm">
              <div className="text-5xl mb-3">🍪</div>
              <h3 className="text-xl font-bold text-[#2B1D16]">
                No Reviews Yet
              </h3>
              <p className="text-gray-500 text-sm mt-1 mb-5">
                Be the first to taste and review this handcrafted masterpiece!
              </p>
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    toast.error("Please login to write a review");
                    navigate(constants.ROUTES.LOGIN);
                  } else {
                    setIsReviewModalOpen(true);
                  }
                }}
                className="bg-[#D98B2B] hover:bg-[#c97818] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition cursor-pointer"
              >
                Leave First Review ⭐
              </button>
            </div>
          )}
        </section>

        {relatedCookies.length > 0 && (
          <section className="mt-16 sm:mt-24 pt-8 border-t border-amber-200/60">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2B1D16]">
                  You Might Also Crave 🍪
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  More fresh bakes from our midnight kitchen.
                </p>
              </div>

              <Link
                to="/cookies"
                className="text-xs sm:text-sm font-bold text-[#D98B2B] hover:underline flex items-center gap-1"
              >
                View All <FiChevronRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCookies.map((c) => (
                <CookieCard key={c._id} cookie={c} />
              ))}
            </div>
          </section>
        )}
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="max-w-[90%] mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={images[0] || placeholderCookie}
              alt={cookie.name}
              className="w-12 h-12 rounded-xl object-cover border border-amber-200 shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-bold text-xs sm:text-sm text-[#2B1D16] truncate">
                {cookie.name}
              </h4>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-sm sm:text-base text-[#D98B2B]">
                  ₹{discountPrice}
                </span>
                <span className="text-[11px] text-gray-500">
                  / {selectedVariant.weight || "pack"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAuthenticated ? (
              <button
                onClick={addToCartHandler}
                disabled={cartLoading || isOutOfStock}
                className="bg-[#D98B2B] hover:bg-[#c97818] text-white px-5 py-3 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md disabled:opacity-50 cursor-pointer"
              >
                <FiShoppingCart size={16} />
                {cartLoading
                  ? "Adding..."
                  : isOutOfStock
                    ? "Sold Out"
                    : "Add to Cart"}
              </button>
            ) : (
              <button
                onClick={() => navigate(constants.ROUTES.LOGIN)}
                className="bg-[#D98B2B] text-white px-5 py-3 rounded-full font-bold text-xs sm:text-sm cursor-pointer shadow-md"
              >
                Login to Buy
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-amber-100 relative"
            >
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition cursor-pointer"
              >
                <FiX size={20} />
              </button>

              <div className="text-center mb-6">
                <div className="text-4xl mb-2">⭐</div>
                <h3 className="text-2xl font-black text-[#2B1D16]">
                  Review {cookie.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  How was the flavor, texture, and midnight delivery?
                </p>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-5">
                <div className="flex flex-col items-center gap-2">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        onMouseEnter={() => setReviewHoverRating(star)}
                        onMouseLeave={() => setReviewHoverRating(0)}
                        className="p-1.5 transition-transform hover:scale-125 cursor-pointer"
                      >
                        <FiStar
                          size={32}
                          className={
                            star <= (reviewHoverRating || reviewRating)
                              ? "fill-amber-500 text-amber-500"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-amber-800">
                    {reviewHoverRating || reviewRating === 5
                      ? "Heavenly! 🤤"
                      : reviewRating === 4
                        ? "Delicious! 🍪"
                        : reviewRating === 3
                          ? "Good! 😊"
                          : reviewRating === 2
                            ? "Fair 🙂"
                            : "Needs Improvement"}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    Your Feedback
                  </label>
                  <textarea
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Tell us about the crunch, molten chocolate, or sweetness..."
                    className="w-full p-4 rounded-2xl border border-amber-200 focus:border-[#D98B2B] focus:ring-2 focus:ring-amber-200/50 outline-none text-sm text-[#2B1D16] transition"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition cursor-pointer text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="flex-1 py-3 px-4 rounded-full bg-[#D98B2B] hover:bg-[#c97818] text-white font-bold transition shadow-md shadow-amber-500/20 disabled:opacity-50 cursor-pointer text-sm"
                  >
                    {submittingReview ? "Submitting..." : "Post Review"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CookieDetails;

