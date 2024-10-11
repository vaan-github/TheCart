import React, { useState } from "react";
import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
  const [notification, setNotification] = useState("");

  const removeItem = (productId) => {
    const itemToRemove = cart.find((item) => item.id === productId);
    if (itemToRemove) {
      setCart(cart.filter((item) => item.id !== productId));
      setNotification(`Removed ${itemToRemove.name} from the cart.`);
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    }
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      {notification && (
        <div className="fixed top-0 left-0 right-0 bg-green-300 p-2 text-center z-50">
          {notification}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>

          {/* Header Row */}
          <div className="flex items-center justify-between font-semibold bg-gray-200 p-4 mb-2">
            <div className="w-16">Product</div>
            <div className="flex-1 ml-4">Name</div>
            <div className="w-24 text-center">Price</div>
            <div className="w-24 text-center">Quantity</div>
            <div className="w-24 text-center">Subtotal</div>
            <div className="w-24"></div> {/* Empty for remove button */}
          </div>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b p-4 mb-4"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover"
              />

              {/* Product Details */}
              <div className="flex-1 ml-4">
                <p className="font-semibold">{item.name}</p>
              </div>

              {/* Price */}
              <div className="w-24 text-center">
                <p>${item.price.toFixed(2)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="w-24 flex items-center justify-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-300 px-2 py-1"
                >
                  -
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="w-12 text-center mx-2 border"
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-300 px-2 py-1"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="w-24 text-center">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-2 py-1 ml-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Cart Totals</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Proceed to Checkout Button */}
          <Link to="/thankyou">
            <button className="bg-blue-500 text-white w-full py-2 transition-transform transform hover:scale-105">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>

      {/* Back to Products Button */}
      <div className="mt-4">
        <Link to="/">
          <button className="bg-gray-500 text-white w-full py-2 transition-transform transform hover:scale-105">
            Back to Products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
