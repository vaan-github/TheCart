import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ThankYou from "./components/ThankYou";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch product data from JSON
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Router>
      <div className="container mx-auto">
        {/* Define routes for different pages */}
        <Routes>
          {/* Route for product listing */}
          <Route
            path="/"
            element={<ProductList products={products} cart={cart} setCart={setCart} />}
          />
          {/* Route for cart summary */}
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          {/* Route for thank you page */}
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
