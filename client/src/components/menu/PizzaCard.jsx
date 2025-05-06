import React, {useState} from 'react';
import {useCart} from '../../context/CartContext.jsx';
import ReviewModal from '../ReviewModal.jsx';
import formatPrice from '../../utils/formatPrice.js';
import useOrderItemReviews from '../../hooks/useOrderItemReviews.js';

/**
 * PizzaCard component for displaying a pizza item.
 * Includes details such as the pizza's name, description, price, and rating.
 * Allows users to add the pizza to the cart or view reviews.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.pizza - The pizza object containing details about the pizza.
 * @param {number} props.pizza.pizza_id - Unique ID of the pizza.
 * @param {string} props.pizza.pizza_name - Name of the pizza.
 * @param {string} props.pizza.pizza_description - Description of the pizza.
 * @param {string} props.pizza.image_url - URL of the pizza's image.
 * @param {number} props.pizza.price - Price of the pizza.
 * @returns {JSX.Element} A card displaying the pizza details.
 */
const PizzaCard = ({pizza}) => {
  const {addToCart} = useCart();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const {averageRating, reviewsCount} = useOrderItemReviews(pizza.pizza_id);

  /**
   * Handles adding the pizza to the cart.
   */
  const handleAddToCart = () => {
    addToCart(pizza);
    console.log('Pizza added to cart:', pizza);
  };

  /**
   * Opens the review modal.
   */
  const handleClick = () => {
    setIsReviewModalOpen(true);
  };

  /**
   * Closes the review modal.
   */
  const handleCloseModal = () => {
    setIsReviewModalOpen(false);
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
          <span className="menu-card-rating-stars">
            ⭐ {averageRating.toFixed(1)}
          </span>
          <span className="menu-card-rating-count">
            ({reviewsCount} reviews)
          </span>
        </div>
        <div className="menu-card-price">{formatPrice(pizza.price)}</div>
        <button className="menu-card-button-add" onClick={handleAddToCart}>
          Lisää ostoskoriin
        </button>

        <button className="menu-card-button-reviews" onClick={handleClick}>
          Katso arvostelut
        </button>

        {isReviewModalOpen && (
          <ReviewModal pizzaId={pizza.pizza_id} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default PizzaCard;
