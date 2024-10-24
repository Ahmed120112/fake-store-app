import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

let ProductList = () => {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);

  useEffect(() => {
    
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to get data');
        setLoading(false);
      });
  }, []);

  
  if (loading) {
    return <div> <h2>Loading...</h2> </div>;
  }

  
  if (error) {
    return <div><h2 className='bg-danger'>{error}</h2></div>;
  }


  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} className='product-img' loading='lazy' />
          <h2 className='product-title'>{product.title}</h2>
          <p>${product.price}</p>
          <p>Rating: {product.rating.rate}</p>
          <button className='btn btn-outline-danger'>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default class Products extends Component {
  render() {
    return (
      <div className='Products-page'>
        <h1>Product List</h1>
        <ProductList/>
      </div>
    );
  }
}