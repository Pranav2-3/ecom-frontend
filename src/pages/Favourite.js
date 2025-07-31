import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../redux/slices/favouriteSlice';
import { addToCart } from '../redux/slices/cartSlice';

const Favourite = () => {
  const favourites = useSelector((state) => state.favorite.items || []);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const confirmRemove = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleRemoveConfirmed = () => {
    dispatch(toggleFavorite(selectedItem));
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4 fw-bold">❤️ Your Wishlist</h2>
      {favourites.length === 0 ? (
        <h5>No favourites yet.</h5>
      ) : (
        <Row className="g-4">
          {favourites.map((item) => (
            <Col key={item.id} sm={12} md={6} lg={4}>
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ height: '250px', objectFit: 'contain', padding: '10px' }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text className="fw-semibold fs-5 text-success">
                    ₹{item.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between gap-2">
                    <Link to={`/product/${item.id}`} className="btn btn-primary btn-sm">
                      View Product
                    </Link>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => confirmRemove(item)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal Confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove <strong>{selectedItem?.title}</strong> from your wishlist?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveConfirmed}>
            Yes, Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Favourite;
