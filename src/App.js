import './App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import Products from './Products';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'



function App() {
  return (
<div>
    <Navbar/>
    <Products/>
    <Footer/>
</div>
  );
}

export default App;
