import React, {useState} from 'react';
import {useCart} from '../context/CartContext';
import ReviewModal from './ReviewModal';
import formatPrice from '../utils/formatPrice.js';
import useOrderItemReviews from '../hooks/useOrderItemReviews.js';

const PizzaCard = ({pizza}) => {
  const {addToCart} = useCart();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const {averageRating, reviewsCount} = useOrderItemReviews(pizza.pizza_id);

  const handleAddToCart = () => {
    addToCart(pizza);
    console.log('Pizza added to cart:', pizza);
  };

  const handleClick = () => {
    setIsReviewModalOpen(true);
  };

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
