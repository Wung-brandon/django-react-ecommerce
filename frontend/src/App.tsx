import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import NavFooterLayout from './Layout/NavFooter.layout';
import { 
          HomePage,
          ProductDetails
      } from './Pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <Router>
      <ToastContainer />
      <NavFooterLayout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          {/* <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>  {/* Routes for different pages */}
      </NavFooterLayout>
     
      
    </Router>
  )
}

export default App
