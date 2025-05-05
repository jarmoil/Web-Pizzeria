import React, {createContext, useContext, useState} from 'react';

const CartContext = createContext();
const CART_STORAGE_KEY = 'cart';

const CartProvider = ({children}) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
  };

  const addToCart = (pizza) => {
    const existingPizza = cart.find((item) => item.pizza_id === pizza.pizza_id);
    const newCart = existingPizza
      ? cart.map((item) =>
          item.pizza_id === pizza.pizza_id
            ? {...item, quantity: item.quantity + 1}
            : item
        )
      : [...cart, {...pizza, quantity: 1}];
    updateCart(newCart);
  };

  const removeFromCart = (pizzaId) => {
    updateCart(cart.filter((pizza) => pizza.pizza_id !== pizzaId));
  };

  const increaseQuantity = (pizzaId) => {
    updateCart(
      cart.map((pizza) =>
        pizza.pizza_id === pizzaId
          ? {...pizza, quantity: pizza.quantity + 1}
          : pizza
      )
    );
  };

  const decreaseQuantity = (pizzaId) => {
    const newCart = cart
      .map((pizza) =>
        pizza.pizza_id === pizzaId
          ? {...pizza, quantity: pizza.quantity - 1}
          : pizza
      )
      .filter((pizza) => pizza.quantity > 0);
    updateCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartCount: cart.length,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export {CartProvider, useCart};
