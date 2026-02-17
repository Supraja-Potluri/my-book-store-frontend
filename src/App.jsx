import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";
import CartDrawer from "./components/CartDrawer";
import "./components/CartDrawer.css";
import ProfilePage from "./components/ProfilePage";
import WishlistPage from "./components/WishlistPage";


function App() {
  // All hooks must be at the top level, before any return or conditional
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const [screen, setScreen] = useState("splash");
  const [initialLoad, setInitialLoad] = useState(true);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mbs_user")) || null;
    } catch {
      return null;
    }
  });
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mbs_wishlist")) || [];
    } catch {
      return [];
    }
  });
  // Persistent fill state for icons
  const [iconFill, setIconFill] = useState({ cart: false, wishlist: false, profile: false });

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize history state
  useEffect(() => {
    window.history.replaceState({ screen: "splash" }, "", "#splash");
  }, []);

  // Update history when screen changes
  useEffect(() => {
    window.history.pushState({ screen }, "", `#${screen}`);
  }, [screen]);

  // Handle browser back button
  useEffect(() => {
    const handler = (e) => {
      const s = e.state?.screen || window.location.hash.replace("#", "") || "splash";
      setScreen(s);
      setInitialLoad(false);
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  // Auto-navigate on initial load
  useEffect(() => {
    if (initialLoad) {
      const timer = setTimeout(() => {
        if (user) {
          setScreen("home");
        } else {
          setScreen("landing");
        }
        setInitialLoad(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [initialLoad, user]);

  const handleNavigate = (destination) => {
    setScreen(destination);
  };

  const handleAddToCart = (book) => {
    setCartItems((items) => [...items, book]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((items) => items.filter((_, i) => i !== index));
  };

  const handleAddToWishlist = (book) => {
    const exists = wishlistItems.some((item) => item.id === book.id);
    if (!exists) {
      const updated = [...wishlistItems, book];
      setWishlistItems(updated);
      localStorage.setItem("mbs_wishlist", JSON.stringify(updated));
    }
  };

  const handleRemoveFromWishlist = (bookId) => {
    const updated = wishlistItems.filter((item) => item.id !== bookId);
    setWishlistItems(updated);
    localStorage.setItem("mbs_wishlist", JSON.stringify(updated));
  };

  const handleSignOut = () => {
    localStorage.removeItem("mbs_user");
    setUser(null);
    setCartItems([]);
    setWishlistItems([]);
    setScreen("landing");
  };

  // SPLASH SCREEN
  if (screen === "splash") {
    return <SplashScreen onFinish={() => setScreen("landing")} />;
  }

  // LANDING PAGE
  if (screen === "landing") {
    return (
      <LandingPage
        onRegister={() => setScreen("auth")}
        onBack={() => setScreen("splash")}
      />
    );
  }

  // AUTH PAGE
  if (screen === "auth") {
    return (
      <AuthPage
        onForward={() => setScreen("home")}
        onSuccess={({ username, firstName, lastName }) => {
          const newUser = {
            name: username || "User",
            firstName: firstName || "",
            lastName: lastName || "",
          };
          setUser(newUser);
          localStorage.setItem("mbs_user", JSON.stringify(newUser));
          setScreen("home");
        }}
      />
    );
  }


  const handleIconFill = (icon) => {
    setIconFill((prev) => ({ ...prev, [icon]: !prev[icon] }));
  };

  // HOME PAGE
  if (screen === "home") {
    return (
      <>
        <HomePage
          user={{ ...user, cartFilled: iconFill.cart, wishlistFilled: iconFill.wishlist, profileFilled: iconFill.profile }}
          cartCount={cartItems.length}
          onAddToCart={handleAddToCart}
          onOpenCart={() => {
            handleIconFill("cart");
            if (isDesktop) setCartDrawerOpen(true);
            else setScreen("cart");
          }}
          onNavigate={(dest) => {
            if (dest === "wishlist") handleIconFill("wishlist");
            if (dest === "profile") handleIconFill("profile");
            handleNavigate(dest);
          }}
          onSelectBook={(book) => {
            // TODO: Navigate to book details page
            console.log("Selected book:", book);
          }}
          wishlistItems={wishlistItems}
          onWishlistToggle={(book) => {
            const exists = wishlistItems.some((item) => item.id === book.id);
            if (exists) handleRemoveFromWishlist(book.id);
            else handleAddToWishlist(book);
          }}
        />
        {isDesktop && (
          <CartDrawer
            open={cartDrawerOpen}
            onClose={() => setCartDrawerOpen(false)}
            items={cartItems}
            onRemove={handleRemoveFromCart}
          />
        )}
      </>
    );
  }

  // CART PAGE (only for mobile/tablet)
  if (screen === "cart") {
    if (isDesktop) return null;
    return (
      <CartPage
        items={cartItems}
        onBack={() => setScreen("home")}
        onRemove={handleRemoveFromCart}
      />
    );
  }

  // PROFILE PAGE
  if (screen === "profile") {
    return (
      <ProfilePage
        user={user}
        onBack={() => setScreen("home")}
        onSignOut={handleSignOut}
      />
    );
  }

  // WISHLIST PAGE
  if (screen === "wishlist") {
    return (
      <WishlistPage
        items={wishlistItems}
        onBack={() => setScreen("home")}
        onAddToCart={handleAddToCart}
        onRemove={handleRemoveFromWishlist}
      />
    );
  }

  return null;
}

export default App;
