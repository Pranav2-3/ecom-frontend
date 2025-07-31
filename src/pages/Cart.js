import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();

  if (!items || items.length === 0) {
    return (
      <div className="container mt-5">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <div className="row">
        {items.map((i, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div className="card h-100 shadow-sm">
              <img
                src={i.image}
                alt={i.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{i.name}</h5>
                <p className="card-text">₹{i.price}</p>
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    value={i.quantity}
                    onChange={(e) =>
                      dispatch(updateQuantity({ id: i.id, quantity: Number(e.target.value) }))
                    }
                    className="form-control w-50"
                  />
                </div>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => dispatch(removeFromCart(i.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-end mt-3">
        <Link to="/checkout" className="btn btn-primary">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
