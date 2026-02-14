// return (
//       <HomePage
//         user={user}
//         cartCount={cartCount}
//         onAddToCart={() => setCartCount((c) => c + 1)}
//         onNavigate={(dest) => {
//           if (dest === "home") setScreen("home");
//           if (dest === "landing") setScreen("landing");
//         }}
//       />
//     );
//   }
// =======
//   if (screen === "home") {
//     return (
//       <HomePage
//         user={user}
//         cartItems={cartItems}
//         onAddToCart={(book) => setCartItems((items) => [...items, book])}
//         onRemoveFromCart={(index) => setCartItems((items) => items.filter((_, i) => i !== index))}
//         onNavigate={(dest) => {
//       navigate('splash')
//     }, 2000)
//     return () => clearTimeout(timer)
//   }, [])

//   useEffect(() => {
//     const handler = (e) => {
//       const s = e.state?.state || window.location.hash.replace('#', '') || 'launch'
//       setAppState(s)
//     }
//     window.addEventListener('popstate', handler)
//     return () => window.removeEventListener('popstate', handler)
//   }, [])

//   if (appState === 'launch') {
//     return <LaunchScreen />
//   }

//   if (appState === 'splash') {
//     return <SplashScreen onGetStarted={() => navigate('form')} onBack={() => window.history.back()} />
//   }

//   if (appState === 'form') {
//     return <FormScreen goBack={() => window.history.back()} />
//   }

//   return null
// }

// export default App


import { useState, useEffect } from "react";
import LottieSplash from "./components/SplashScreen";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";

function App() {
  const [screen, setScreen] = useState("splash");
  const [initialLoad, setInitialLoad] = useState(true);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    window.history.replaceState({ screen: "splash" }, '', '#splash');
  }, []);

  useEffect(() => {
    window.history.pushState({ screen }, '', `#${screen}`);
  }, [screen]);

  useEffect(() => {
    const handler = (e) => {
      const s = e.state?.screen || window.location.hash.replace('#', '') || 'splash';
      setScreen(s);
      setInitialLoad(false);
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  useEffect(() => {
    if (initialLoad) {
      setTimeout(() => {
        setScreen("landing");
        setInitialLoad(false);
      }, 2500);
    }
  }, [initialLoad]);

  if (screen === "splash") {
    return <LottieSplash onFinish={() => setScreen("landing")} />;
  }

  if (screen === "landing") {
    return <LandingPage onRegister={() => setScreen("auth")} onBack={() => setScreen("splash")} />;
  }

  if (screen === "auth") {
    return (
      <AuthPage
        onForward={() => setScreen("home")}
        onSuccess={({ username }) => {
          setUser({ name: username || "Account" });
          setScreen("home");
        }}
      />
    );
  }

  if (screen === "home") {
    return (
      <HomePage
        user={user}
        cartCount={cartItems.length}
        onAddToCart={(book) => setCartItems((items) => [...items, book])}
        onOpenCart={() => setScreen("cart")}
        onNavigate={(dest) => {
          if (dest === "home") setScreen("home");
          if (dest === "landing") setScreen("landing");
        }}
      />
    );
  }
  if (screen === "cart") {
    return <CartPage items={cartItems} onBack={() => setScreen("home")} />;
  }

  return null;
}

export default App;
