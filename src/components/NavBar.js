import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  const count = useSelector(state => state.cart.items.length);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
      <Link className="navbar-brand fw-bold text-warning" to="/">E‑Shop</Link>
      <button className="navbar-toggler" type="button"
              data-bs-toggle="collapse" data-bs-target="#navContent"
              aria-controls="navContent" aria-expanded="false">
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navContent">
        <ul className="navbar-nav align-items-center">
          <li className="nav-item mx-2">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink to="/cart" className="btn btn-outline-light">
              🛒 Cart ({count})
            </NavLink>
            <NavLink to="/favourite" className="btn btn-outline-light ms-2">
              ❤️ Wishlist
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
