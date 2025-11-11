import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./components/context/authContext.jsx";
import { SearchProvider } from "./components/context/searchcontext.jsx";
import { CartProvider } from "./components/context/Cart.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
      <CartProvider>
        <AuthProvider>
          <SearchProvider>
    <BrowserRouter>
            <App />
    </BrowserRouter>
          </SearchProvider>
        </AuthProvider>
      </CartProvider>
  </HelmetProvider>
);
