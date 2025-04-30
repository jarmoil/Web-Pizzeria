import React, {createContext, useContext, useState, useEffect} from 'react';

// Create Cart Context
const CartContext = createContext();

// Cart Provider to manage the cart state globally
const CartProvider = ({children}) => {
  // Initialize cart state from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Function to add a pizza to the cart
  const addToCart = (pizza) => {
    const existingPizza = cart.find((item) => item.pizza_id === pizza.pizza_id);
    if (existingPizza) {
      setCart(
        cart.map((item) =>
          item.pizza_id === pizza.pizza_id
            ? {...item, quantity: item.quantity + 1}
            : item
        )
      );
    } else {
      setCart([...cart, {...pizza, quantity: 1}]);
    }
    console.log('Cart after adding pizza:', cart); // Log cart to console
  };

  const removeFromCart = (pizzaId) => {
    // Filter out the pizza that matches the pizzaId
    const updatedCart = cart.filter((pizza) => pizza.pizza_id !== pizzaId);

    // Update cart state
    setCart(updatedCart);

    // Manually update localStorage with the new cart state
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Function to increase the quantity of a pizza in the cart
  const increaseQuantity = (pizzaId) => {
    setCart(
      cart.map((pizza) =>
        pizza.pizza_id === pizzaId
          ? {...pizza, quantity: pizza.quantity + 1}
          : pizza
      )
    );
  };

  // Function to decrease the quantity of a pizza in the cart
  const decreaseQuantity = (pizzaId) => {
    setCart((prevCart) => {
      // Find the pizza in the cart
      const updatedCart = prevCart.map((pizza) =>
        pizza.pizza_id === pizzaId
          ? {...pizza, quantity: pizza.quantity > 1 ? pizza.quantity - 1 : 0}
          : pizza
      );

      // Remove pizzas that have quantity 0
      const filteredCart = updatedCart.filter((pizza) => pizza.quantity > 0);

      // Update localStorage after modifying the cart
      localStorage.setItem('cart', JSON.stringify(filteredCart));

      return filteredCart;
    });
  };

  const cartCount = cart.length;

  const clearCart = () => {
    setCart([]);
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartCount,
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
