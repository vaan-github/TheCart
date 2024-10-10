import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProductList({ products, cart, setCart }) {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [notification, setNotification] = useState("");

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: parseInt(value) });
  };

  const filteredProducts = products.filter((product) => {
    return (
      (categoryFilter === "" || product.category === categoryFilter) &&
      (sizeFilter === "" || product.size === sizeFilter) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const updatedCart = [...cart];
    const productInCart = updatedCart.find((item) => item.id === product.id);

    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity });
    }

    setCart(updatedCart);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="p-4">
      {/* Fixed notification */}
      {notification && (
        <div className="fixed bottom-0 left-0 w-full bg-green-300 p-2 text-center z-20">
          {notification}
        </div>
      )} 

      {/* Sticky Filter and Search Section */}
      <div className="sticky top-0 bg-white z-10 p-4 shadow-md mb-6"> {/* Adjusted top position to make room for notification */}
        <div className="flex justify-between items-center">
          {/* Category and Size Filters */}
          <div className="flex">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border p-2"
            >
              <option value="">All Categories</option>
              <option value="Hoodie">Hoodie</option>
              <option value="T-shirt">T-shirt</option>
            </select>
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="border p-2 ml-2"
            >
              <option value="">All Sizes</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </select>
          </div>

          {/* Search Bar and "Go to Cart" Button */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2"
            />
            <Link to="/cart">
              <button className="bg-green-500 text-white px-4 py-2 ml-2">
                Go to Cart
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Product List Section */}
      {filteredProducts.length ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            <p>{product.category}</p>
            <p>{product.size}</p>

            <input
              type="number"
              value={quantities[product.id] || 1}
              min="1"
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
              className="border p-1 w-16"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 ml-2 transition-transform transform hover:scale-105"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div> : <div style = {{display : "flex", justifyContent : "center", width : "100%"}}>No Result Found</div> }
    </div>
  );
}

export default ProductList;
