import React, {createContext, useContext, useState} from 'react';

const CartContext = createContext();
const CART_STORAGE_KEY = 'cart';


/**
 * CartProvider component for managing the shopping cart state and providing it to child components.
 * Handles adding, removing, updating, and clearing items in the cart.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the cart context.
 * @returns {JSX.Element} The cart context provider.
 */
const CartProvider = ({children}) => {
    /**
   * State for storing the cart items.
   * Initializes from localStorage if available.
   * @type {Object[]}
   */
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  /**
   * Updates the cart state and saves it to localStorage.
   *
   * @param {Object[]} newCart - The updated cart items.
   */
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
  };

  /**
   * Adds a pizza to the cart. If the pizza already exists, increases its quantity.
   *
   * @param {Object} pizza - The pizza object to add to the cart.
   * @param {number} pizza.pizza_id - The unique ID of the pizza.
   * @param {string} pizza.name - The name of the pizza.
   * @param {number} pizza.price - The price of the pizza.
   */
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

  /**
   * Removes a pizza from the cart by its ID.
   *
   * @param {number} pizzaId - The ID of the pizza to remove.
   */
  const removeFromCart = (pizzaId) => {
    updateCart(cart.filter((pizza) => pizza.pizza_id !== pizzaId));
  };

  /**
   * Increases the quantity of a pizza in the cart by its ID.
   *
   * @param {number} pizzaId - The ID of the pizza to increase the quantity of.
   */
  const increaseQuantity = (pizzaId) => {
    updateCart(
      cart.map((pizza) =>
        pizza.pizza_id === pizzaId
          ? {...pizza, quantity: pizza.quantity + 1}
          : pizza
      )
    );
  };

  /**
   * Decreases the quantity of a pizza in the cart by its ID.
   * Removes the pizza from the cart if its quantity reaches zero.
   *
   * @param {number} pizzaId - The ID of the pizza to decrease the quantity of.
   */
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

  /**
   * Clears all items from the cart and removes the cart from localStorage.
   */
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

/**
 * Custom hook for accessing the cart context.
 * Throws an error if used outside of a `CartProvider`.
 *
 * @returns {Object} The cart context value.
 */
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export {CartProvider, useCart};
