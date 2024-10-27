// ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // لاستخدام التوجيه
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleAddToCart = () => {
    // توجيه المستخدم إلى صفحة الطلب مع تمرير المنتج كجزء من الحالة
    navigate('/order', { state: { cart: [{ ...product, quantity: 1 }] } });
  };

  return (
    <div className="product-details container my-5">
      <h1>{product.title}</h1>
      <div className="details-content">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="details-info">
          <h3>Price: ${product.price}</h3>
          <p>{product.description}</p>
          <p className="category"><strong>Category:</strong> {product.category}</p>
          <p className="rating"><strong>Rating:</strong> {product.rating?.rate} / 5</p>
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart & Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;