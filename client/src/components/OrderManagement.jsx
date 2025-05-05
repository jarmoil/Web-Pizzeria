import useOrderManagement from '../hooks/useOrderManagement';
import {useAuth} from '../hooks/useAuth';

const ORDER_STATUSES = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const OrderManagement = () => {
  const {user} = useAuth();
  const {orders, loading, error, updateOrderStatus} = useOrderManagement(
    user?.token
  );

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  const ordersByStatus = orders.reduce((acc, order) => {
    const status = order.order_status || 'pending';
    if (!acc[status]) acc[status] = [];
    acc[status].push(order);
    return acc;
  }, {});

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const renderOrderCard = (order) => (
    <div key={order.order_id} className="order-card">
      <div className="order-header">
        <h4>Order #{order.order_id}</h4>
        <span className={`order-status ${order.order_status}`}>
          {ORDER_STATUSES[order.order_status]}
        </span>
      </div>
      <div className="order-details">
        <p>Total: €{order.total_price}</p>
        <p>
          Delivery:{' '}
          {order.is_pickup ? 'Pickup' : `Delivery to: ${order.address}`}
        </p>
        <p>Date: {new Date(order.created_at).toLocaleString()}</p>
      </div>
      <div className="order-items">
        {order.items?.map((item) => (
          <div key={item.order_item_id} className="order-item">
            <span>{item.pizza_name}</span>
            <span>x{item.quantity}</span>
          </div>
        ))}
      </div>
      <div className="order-actions">
        <select
          value={order.order_status}
          onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
          disabled={
            order.order_status === 'cancelled' ||
            order.order_status === 'completed'
          }
        >
          {Object.entries(ORDER_STATUSES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <section id="order-management" className="managementPage-section">
      <h2 className="managementPage-section-title">Order Management</h2>
      <div className="order-sections">
        {Object.entries(ORDER_STATUSES).map(([status, label]) => (
          <div key={status} className="order-section">
            <h3>{label} Orders</h3>
            <div className="order-list">
              {ordersByStatus[status]?.map(renderOrderCard) || (
                <p>No {label.toLowerCase()} orders</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderManagement;
