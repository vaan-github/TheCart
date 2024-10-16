import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductList({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    size: "",
    search: "",
  });
  const [selectedProducts, setSelectedProducts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products.json");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (id, value) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), quantity: parseInt(value) },
    }));
  };

  const handleCheckboxChange = (id, checked) => {
    setSelectedProducts((prev) => {
      const updated = { ...prev, [id]: { ...(prev[id] || {}), selected: checked } };
      if (!checked) delete updated[id];
      return updated;
    });
  };

  const addToCart = () => {
    const updatedCart = [...cart];
    Object.keys(selectedProducts).forEach((id) => {
      const product = products.find((item) => item.id === parseInt(id));
      const quantity = selectedProducts[id]?.quantity || 1;
      const cartItem = updatedCart.find((item) => item.id === product.id);

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        updatedCart.push({ ...product, quantity });
      }
    });
    setCart(updatedCart);
    navigate("/cart");
  };

  const resetFilters = () => {
    setFilters({ category: "", size: "", search: "" });
  };

  const filteredProducts = products.filter((product) => {
    const { category, size, search } = filters;
    return (
      (!category || product.category === category) &&
      (!size || product.size === size) &&
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col min-h-screen p-4">
      {/* Filter and Search Bar */}
      <div className="sticky top-0 bg-white z-10 p-4 shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto mb-4 sm:mb-0 space-y-4 sm:space-y-0 sm:space-x-2">
          <select
            value={filters.category}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
            className="border p-2 rounded-md w-full sm:w-40"
          >
            <option value="">All Categories</option>
            <option value="Hoodie">Hoodie</option>
            <option value="T-shirt">T-shirt</option>
          </select>

          <select
            value={filters.size}
            onChange={(e) => setFilters((prev) => ({ ...prev, size: e.target.value }))}
            className="border p-2 rounded-md w-full sm:w-40"
          >
            <option value="">All Sizes</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
            <option value="XXL">Very Large</option>
          </select>

          <button onClick={resetFilters} className="bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto">
            Reset
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto space-y-4 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Search Products"
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            className="border p-2 w-full sm:w-60 rounded-md"
          />
          <button onClick={addToCart} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="flex-grow border border-gray-300 rounded-lg overflow-hidden">
        {/* Unified Header */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 bg-gray-200 p-2 text-center">
          <div className="col-span-1">Image</div>
          <div className="col-span-1">Name</div>
          <div className="col-span-1 hidden md:block">Color</div>
          <div className="col-span-1">In Stock</div>
          <div className="col-span-1 hidden md:block">Price</div>
          <div className="col-span-1">Buy</div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-auto" style={{ maxHeight: '100%' }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-4 md:grid-cols-6 gap-4 p-2 items-center hover:bg-gray-100 text-center"
            >
              {/* Image */}
              <div className="col-span-1 flex justify-center">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
              </div>

              {/* Name */}
              <div className="col-span-1">
                <p className="font-semibold">{product.name}</p>
              </div>

              {/* Color (hidden on small screens) */}
              <div className="col-span-1 hidden md:block">
                <p>{product.color || "N/A"}</p>
              </div>

              {/* Stock */}
              <div className="col-span-1">{product.instock ? "Yes" : "No"}</div>

              {/* Price (hidden on small screens) */}
              <div className="col-span-1 hidden md:block">${product.price.toFixed(2)}</div>

              {/* Buy Section */}
              <div className="col-span-1">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
                  className="mr-2"
                />
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  className="w-12 border p-1 rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
