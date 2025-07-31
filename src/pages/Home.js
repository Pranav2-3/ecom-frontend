import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleFavorite } from '../redux/slices/favouriteSlice';

const Home = () => {
  const { items, loading, error } = useSelector(state => state.products);
  const { items: favourites } = useSelector(state => state.favorite);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [addedProductIds, setAddedProductIds] = useState([]);

  const categories = [...new Set(
    items.map(product => product.category?.trim().toLowerCase()).filter(Boolean)
  )];

  const isFavourite = (productId) =>
    favourites.some(item => item.id === productId);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAddedProductIds(prev => [...prev, product.id]);

    setTimeout(() => {
      setAddedProductIds(prev => prev.filter(id => id !== product.id));
    }, 1000);
  };

  const handleToggleFavorite = (product) => {
    dispatch(toggleFavorite(product));
  };

  const filteredItems = items.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter
      ? product.category?.trim().toLowerCase() === categoryFilter.trim().toLowerCase()
      : true)
  );

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">❌ Failed to load products. Please try again later.</p>;

  return (
    <>
      <Banner />
      <div className="container mt-4">

        {/* Search + Filter */}
        <div className="row mb-4">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search by product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-2">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <h2 className="text-center mb-4">✨ Our Top Picks</h2>
        <div className="row">
          {filteredItems.length === 0 ? (
            <p className="text-center">No products match your search or category filter.</p>
          ) : (
            filteredItems.map(product => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div
                  className="card h-100 shadow-sm border-0 position-relative"
                  style={{
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    borderRadius: '16px',
                    overflow: 'hidden',
                  }}
                >
                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleToggleFavorite(product)}
                    className="btn position-absolute"
                    style={{
                      top: '10px',
                      right: '10px',
                      zIndex: 2,
                      background: 'white',
                      borderRadius: '50%',
                      padding: '6px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    }}
                  >
                    <span
                      style={{
                        color: isFavourite(product.id) ? 'red' : '#888',
                        fontSize: '1.2rem',
                      }}
                    >
                      {isFavourite(product.id) ? '❤️' : '🤍'}
                    </span>
                  </button>

                  {/* Product Image */}
                  <div style={{ position: 'relative' }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/${product.image}`}
                      onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/images/fallback.jpg`)}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <span
                      className="badge bg-success"
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        padding: '0.5em 0.75em',
                        fontSize: '0.8rem',
                        borderRadius: '8px',
                      }}
                    >
                      New
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <div className="mb-2">
                      <span className="text-warning">★ ★ ★ ★ ☆</span>
                      <span className="text-muted ms-2" style={{ fontSize: '0.85rem' }}>
                        4.0 (120)
                      </span>
                    </div>
                    <p className="card-text text-primary fw-semibold fs-5 mb-2">
                      ₹{product.price}
                    </p>
                    <Link to={`/product/${product.id}`} className="btn btn-outline-dark mt-auto">
                      View Details
                    </Link>
                    <button
                      className="btn btn-dark mt-2"
                      onClick={() => handleAddToCart(product)}
                      disabled={addedProductIds.includes(product.id)}
                    >
                      {addedProductIds.includes(product.id) ? '✔ Added!' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
