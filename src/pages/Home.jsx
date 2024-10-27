// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bannerImage from '../includs/images/banner.webp';
import icon1 from '../includs/images/e-commerce.png';
import icon2 from '../includs/images/ecommerce.png';
import icon3 from '../includs/images/online-shop.png';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orderConfirmed, setOrderConfirmed] = useState(false); // حالة تأكيد الطلب
  const location = useLocation();

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => {
        const productsByCategory = {
          "men's clothing": res.data.find(product => product.category === "men's clothing"),
          "electronics": res.data.find(product => product.category === "electronics"),
          "jewelery": res.data.find(product => product.category === "jewelery"),
          "women's clothing": res.data.find(product => product.category === "women's clothing"),
        };
        setProducts(Object.values(productsByCategory).filter(Boolean));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });

    // التحقق مما إذا كانت حالة الطلب مؤكدة من صفحة Order
    if (location.state?.orderConfirmed) {
      setOrderConfirmed(true);
    }
  }, [location.state]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <div className="home">
      <h1>Welcome to Fake Store</h1>
      <p>Your one-stop shop for everything you need!</p>
      
      {/* عرض رسالة تأكيد الطلب */}
      {orderConfirmed && (
        <div className="alert alert-success text-center">
          Your order is confirmed!
        </div>
      )}

 
      <div className="home-banner">
        <img src={bannerImage} alt="Store Banner" className="banner-image" />
      </div>

      {/* About Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Fake Store is an online store offering a wide variety of products for
          all your needs. 
          <Link to="/about">Learn more about us.</Link>
          </p>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <h2>Featured Products</h2>
        {loading && <p>Loading products...</p>}
        {error && <p className="bg-danger text-white p-2">{error}</p>}

        <div className="carousel-container">
          {products.length > 0 && (
            <div className="carousel-slide">
              <div className="product-card" style={{ width: '18rem' }}>
                <img
                  src={products[currentIndex].image}
                  alt={products[currentIndex].title}
                  className="card-img-top product-img"
                  loading="lazy"
                />
                <div className="card-body">
                  <h5 className="card-title">{products[currentIndex].title}</h5>
                  <p className="card-text">$</p>

                  <Link
                    to={{
                      pathname: "/products",
                      state: { category: products[currentIndex].category } // تمرير الفئة هنا
                    }}
                    className="btn btn-outline-danger"
                  >
                    More
                  </Link>
                </div>
              </div>
            </div>
          )}

          <button className="prev-btn" onClick={handlePrev}>
            &#10094;
          </button>
          <button className="next-btn" onClick={handleNext}>
            &#10095;
          </button>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <h2>Our Partners</h2>
        <div className="partner-logos">
          <img src={icon1} alt="Company 1" />
          <img src={icon2} alt="Company 2" />
          <img src={icon3} alt="Company 3" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: info@fakestore.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Fake Street, Faketown, FS 12345</p>
        <Link to="/contact" className='btn btn-primary mt-2'>Go to Contact Page</Link>
      </section>
    </div>
  );
};

export default Home;