import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

let lastAddedId = null;
let lastAddedTime = 0;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        localStorage.removeItem("cart"); // if corrupted data
      }
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add product (increase quantity if it already exists)
  const addToCart = (product) => {
    const now = Date.now();
    if (product._id === lastAddedId && now - lastAddedTime < 300) return; // ignore double click
    lastAddedId = product._id;
    lastAddedTime = now;

    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ✅ Remove single item or reduce quantity
  const removeFromCart = (id) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === id);
      if (!existing) return prev;
      if ((existing.quantity || 1) > 1) {
        return prev.map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter((item) => item._id !== id);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
