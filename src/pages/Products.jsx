import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to get data');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setCartVisible(true);
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const handleOrderNow = () => {
    navigate('/order', { state: { cart } });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // تصفية المنتجات داخل كل فئة بناءً على مصطلح البحث
  const filterProductsByCategory = (category) => {
    return products
      .filter(product => product.category === category)
      .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="bg-danger text-white p-3">{error}</h2>
        <button className="btn btn-primary mt-3" onClick={fetchProducts}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="product-page">
      <h1 className='text-center mb-5'>Product List</h1>

      {/* شريط البحث */}
      <div className='search-bar text-center mb-4'>
        <input
          type="text"
          placeholder='Search for products...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='form-control w-50 mx-auto'
        />
      </div>

      {cartVisible && (
       <aside className="cart-section">
       <h2>Shopping Cart</h2>
       {cart.length > 0 ? (
         <div>
           <ul>
             {cart.map((item, index) => (
               <li key={index} className="cart-item">
                 <img src={item.image} alt={item.title} className="cart-item-img" />
                 <div className="cart-item-details">
                   <h5>{item.title}</h5>
                   <p>Price: ${item.price} x {item.quantity}</p>
                 </div>
                 <div className="cart-quantity-controls">
                   <button
                     className="quantity-btn"
                     onClick={() =>
                       setCart(prevCart =>
                         prevCart.map((cartItem, cartIndex) =>
                           cartIndex === index && cartItem.quantity > 1
                             ? { ...cartItem, quantity: cartItem.quantity - 1 }
                             : cartItem
                         )
                       )
                     }
                   >
                     -
                   </button>
                   <span>{item.quantity}</span>
                   <button
                     className="quantity-btn"
                     onClick={() =>
                       setCart(prevCart =>
                         prevCart.map((cartItem, cartIndex) =>
                           cartIndex === index
                             ? { ...cartItem, quantity: cartItem.quantity + 1 }
                             : cartItem
                         )
                       )
                     }
                   >
                     +
                   </button>
                 </div>
                 <button
                   className="cart-remove-btn"
                   onClick={() => setCart(prevCart => prevCart.filter((_, i) => i !== index))}
                 >
                   Remove
                 </button>
               </li>
             ))}
           </ul>
           <div className="cart-footer">
             <h3>Total: ${totalPrice.toFixed(2)}</h3>
             <button onClick={() => setCart([])} className="btn-clear">Clear All</button>
             <button onClick={handleOrderNow} className="btn-order">Order Now</button>
           </div>
         </div>
       ) : (
         <p className="text-center">The cart is empty</p>
       )}
     </aside>
      )}

      {/* عرض المنتجات ضمن الفئات مع التصفية حسب مصطلح البحث */}
      <h2 className='text-center mb-5'>Clothes</h2>
      <div className="product-grid">
        {filterProductsByCategory("men's clothing").map(product => (
          <div key={product.id} className="product-card" onClick={() => handleViewDetails(product.id)}>
            <img src={product.image} alt={product.title} className='product-img' loading='lazy' />
            <h2 className='product-title'>{product.title}</h2>
            <p>${product.price}</p>
            <p>Rating: {product.rating.rate}</p>
            <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className='btn btn-outline-danger'>
              Buy
            </button>
          </div>
        ))}
      </div>

      <h2 className='text-center m-5'>Tech</h2>
      <div className="product-grid">
        {filterProductsByCategory("electronics").map(product => (
          <div key={product.id} className="product-card" onClick={() => handleViewDetails(product.id)}>
            <img src={product.image} alt={product.title} className='product-img' loading='lazy' />
            <h2 className='product-title'>{product.title}</h2>
            <p>${product.price}</p>
            <p>Rating: {product.rating.rate}</p>
            <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className='btn btn-outline-danger'>
              Buy
            </button>
          </div>
        ))}
      </div>

      <h2 className='text-center m-5'>Jewelry</h2>
      <div className="product-grid">
        {filterProductsByCategory("jewelery").map(product => (
          <div key={product.id} className="product-card" onClick={() => handleViewDetails(product.id)}>
            <img src={product.image} alt={product.title} className='product-img' loading='lazy' />
            <h2 className='product-title'>{product.title}</h2>
            <p>${product.price}</p>
            <p>Rating: {product.rating.rate}</p>
            <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className='btn btn-outline-danger'>
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;