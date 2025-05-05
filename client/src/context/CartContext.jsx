import React, {createContext, useContext, useState, useEffect} from 'react';

const CartContext = createContext();

const CartProvider = ({children}) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

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
    console.log('Cart after adding pizza:', cart);
  };

  const removeFromCart = (pizzaId) => {
    const updatedCart = cart.filter((pizza) => pizza.pizza_id !== pizzaId);

    setCart(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (pizzaId) => {
    setCart(
      cart.map((pizza) =>
        pizza.pizza_id === pizzaId
          ? {...pizza, quantity: pizza.quantity + 1}
          : pizza
      )
    );
  };

  const decreaseQuantity = (pizzaId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((pizza) =>
        pizza.pizza_id === pizzaId
          ? {...pizza, quantity: pizza.quantity > 1 ? pizza.quantity - 1 : 0}
          : pizza
      );

      const filteredCart = updatedCart.filter((pizza) => pizza.quantity > 0);

      localStorage.setItem('cart', JSON.stringify(filteredCart));

      return filteredCart;
    });
  };

  const cartCount = cart.length;

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
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
