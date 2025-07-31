import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleFavorite } from '../redux/slices/favouriteSlice';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector(s => s.products.items.find(p => p.id === Number(id)));
  const favourites = useSelector(s => s.favorite.items);
  const dispatch = useDispatch();

  if (!product) return <p className="text-center mt-5">Product not found.</p>;

  const isFavorite = favourites.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`🛒 ${product.name} added to cart`);
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product));
    if (isFavorite) {
      toast.info(`💔 ${product.name} removed from wishlist`);
    } else {
      toast.success(`❤️ ${product.name} added to wishlist`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        className="img-fluid mb-3"
        style={{ maxHeight: '400px', objectFit: 'cover' }}
      />
      <p className="lead">₹{product.price}</p>
      <p>{product.description}</p>

      {/* Wishlist Button */}
      <button
        className="btn btn-outline-danger me-3"
        onClick={handleToggleFavorite}
      >
        {isFavorite ? '💔 Remove from Wishlist' : '❤️ Add to Wishlist'}
      </button>

      {/* Cart Button */}
      <button className="btn btn-success" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
