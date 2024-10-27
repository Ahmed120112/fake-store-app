import './App.css';
import Footer from './includs/components/Footer';
import NavbarWithAuth from './includs/components/Navbar'; // Ensuring correct Navbar import with Auth
import Products from './pages/Products';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Order from './includs/components/Odrer';
import Payment from './includs/components/Payment';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './includs/components/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth(); // Accessing user authentication state
  return user ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <NavbarWithAuth />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protect the /payment route */}
            <Route 
              path="/payment" 
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              } 
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;