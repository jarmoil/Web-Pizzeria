import React, {useState} from 'react';
import {useCart} from '../context/CartContext';
import ReviewModal from './ReviewModal'; // Import the ReviewModal component

const PizzaCard = ({pizza}) => {
  const {addToCart} = useCart();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart(pizza); // Add pizza to the cart
    console.log('Pizza added to cart:', pizza);
  };

  const handleClick = () => {
    setIsReviewModalOpen(true); // Open the modal when button is clicked
  };

  const handleCloseModal = () => {
    setIsReviewModalOpen(false); // Close the modal
  };

  return (
    <div className="menu-card">
      <img
        src={pizza.image_url}
        alt={pizza.pizza_name}
        className="menu-card-image"
      />
      <div className="menu-card-content">
        <h3 className="menu-card-title">{pizza.pizza_name}</h3>
        <p className="menu-card-description">{pizza.pizza_description}</p>
        <div className="menu-card-rating">
          <span className="menu-card-rating-stars">⭐ 4.5</span>
          <span className="menu-card-rating-count">(37 reviews)</span>
        </div>
        <div className="menu-card-price">{pizza.price} €</div>
        <button className="menu-card-button-add" onClick={handleAddToCart}>
          Lisää ostoskoriin
        </button>

        <button
          className="menu-card-button-reviews"
          onClick={handleClick} // Open the reviews modal
        >
          Katso arvostelut
        </button>

        {/* Render the ReviewModal when open */}
        {isReviewModalOpen && (
          <ReviewModal
            pizzaId={pizza.pizza_id} // Pass pizzaId to fetch specific reviews
            onClose={handleCloseModal} // Pass close function to close modal
          />
        )}
      </div>
    </div>
  );
};

export default PizzaCard;
