const CartButton = ({ isVisible, onClose }) => {
  return (
    isVisible && (
      <div id="cart-dropdown" className="cart-dropdown">
        <div id="cart-box">
          <button id="cart-close" className="close-btn" onClick={onClose}>
            &times;
          </button>
          <h2>Your Cart</h2>
          <ul id="cart-items">
            <li id="cart-item1">
              <span>Item 1</span>
              <span>$10</span>
            </li>
            <li id="cart-item2">
              <span>Item 2</span>
              <span>$15</span>
            </li>
          </ul>
          <div id="cart-total">
            <span>Total:</span>
            <span>$25</span>
          </div>
          <button id="cart-checkout-btn">Checkout</button>
        </div>
      </div>
    )
  );
};

export default CartButton;
