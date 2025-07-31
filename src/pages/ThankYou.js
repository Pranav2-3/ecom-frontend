import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const orderData = location.state;

  if (!orderData) {
    return (
      <div className="container mt-5">
        <h3>No order found. Please place an order first.</h3>
        <Button variant="primary" className="mt-3" onClick={() => navigate('/')}>
          🏠 Go to Home
        </Button>
      </div>
    );
  }

  const { customer, order } = orderData;
  const totalAmount = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-5 mb-5">
      <Card className="p-5 shadow-lg" style={{ borderRadius: '20px', background: '#fffefb' }}>
        <h2 className="text-success fw-bold mb-3 text-center">🎉 Thank You for Your Order!</h2>
        <p className="text-center text-muted mb-4">Your order has been placed successfully. Below are the order details:</p>

        {/* Customer Info */}
        <Card className="p-4 mb-4" style={{ borderLeft: '5px solid #28a745', background: '#f9f9f9' }}>
          <h5 className="fw-bold mb-3">📍 Delivery Details</h5>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>Payment Mode:</strong> {customer.paymentMode}</p>
        </Card>

        {/* Product Summary */}
        <Card className="p-4 mb-4" style={{ background: '#fefefe', border: '1px dashed #ccc' }}>
          <h5 className="fw-bold mb-3">🛍️ Purchased Items</h5>
          {order.map((item, index) => (
            <div key={index} className="d-flex align-items-center mb-4">
              <img
                src={`${process.env.PUBLIC_URL}/${item.image}`}
                onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/images/fallback.jpg`)}
                alt={item.name}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  background: '#f0f0f0',
                  marginRight: '15px'
                }}
              />
              <div style={{ flexGrow: 1 }}>
                <h6 className="mb-1">{item.name}</h6>
                <small className="text-muted">
                  ₹{item.price} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                </small>
              </div>
            </div>
          ))}

          <hr />
          <h5 className="text-end fw-bold">Total: ₹{totalAmount.toFixed(2)}</h5>
          <p className="text-muted text-end">🚚 Expected Delivery: Within 3–5 business days</p>
        </Card>

        {/* Back to Home Button */}
        <div className="text-center mt-4">
          <Button
            variant="dark"
            onClick={() => navigate('/')}
            style={{ padding: '10px 30px', borderRadius: '30px' }}
          >
            🏡 Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ThankYou;
