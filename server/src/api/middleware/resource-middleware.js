import {getOrderById} from '../models/orders-model.js';

const checkOwnOrderOrAdmin = async (req, res, next) => {
  const userId = req.user.user_id;
  const userRole = req.user.role;

  // tilausten peruuttamiseen vaaditaan order_id
  if (req.params.id) {
    const orderId = parseInt(req.params.id);

    try {
      const order = await getOrderById(orderId);
      if (!order) return res.status(404).json({error: 'Order not found'});

      // onko admin vai omistaja customer
      if (order.user_id === userId || userRole === 'admin') {
        return next();
      }

      return res.status(403).json({error: 'Not authorized for this order'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: 'Authorization failed'});
    }
  }

  // /orders/my route, näkee kaikki omat tilaukset
  if (userRole === 'admin' || userId) {
    return next();
  }

  return res.status(403).json({error: 'Not authorized'});
};

export {checkOwnOrderOrAdmin};
