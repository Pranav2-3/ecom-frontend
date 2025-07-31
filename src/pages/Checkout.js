import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentMode: 'Credit Card',
  });

  // Update form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Email and phone validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) =>
    /^[6-9]\d{9}$/.test(phone);

  // Handle order submission
  const handlePlaceOrder = async () => {
    const { name, email, address, phone } = form;

    if (!name || !email || !address || !phone) {
      alert('Please fill in all required fields!');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address!');
      return;
    }

    if (!isValidPhone(phone)) {
      alert('Please enter a valid 10-digit phone number!');
      return;
    }

    const orderData = {
      customer: form,
      order: cartItems,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        dispatch(clearCart());
        setForm({
          name: '',
          email: '',
          address: '',
          phone: '',
          paymentMode: 'Credit Card',
        });
        navigate('/thankyou', { state: orderData });
      } else {
        const error = await response.json();
        alert(`Order failed: ${error.message}`);
      }
    } catch (err) {
      console.error('Order error:', err);
      alert('Something went wrong while placing the order.');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold mb-4">🧾 Checkout</h2>
      <div className="row">
        {/* Customer Form Section */}
        <div className="col-md-7 mb-4">
          <Card className="p-4 shadow-sm">
            <h4 className="mb-3">🧍 Customer Details</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter your full address"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your 10-digit phone number"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Payment Mode</Form.Label>
                <Form.Select
                  name="paymentMode"
                  value={form.paymentMode}
                  onChange={handleChange}
                >
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>UPI</option>
                  <option>Cash on Delivery</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Card>
        </div>

        {/* Order Summary Section */}
        <div className="col-md-5">
          <Card className="p-4 shadow-sm">
            <h4 className="mb-3">🛒 Order Summary</h4>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between mb-3 align-items-center"
                  >
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'contain',
                          borderRadius: '8px',
                          background: '#f8f8f8',
                        }}
                      />
                      <div>
                        <strong>{item.name}</strong>
                        <br />
                        ₹{item.price} × {item.quantity}
                      </div>
                    </div>
                    <div className="fw-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total:</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <p className="text-muted mt-2">
                  🚚 Estimated Delivery: 3–5 business days
                </p>
                <Button
                  variant="success"
                  className="w-100 mt-3"
                  onClick={handlePlaceOrder}
                >
                  ✅ Place Order
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
