import React, { useState } from "react";
import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
  const [notification, setNotification] = useState("");

  const removeItem = (productId) => {
    const itemToRemove = cart.find(item => item.id === productId);
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
      <h2 className="text-xl font-bold mb-4 mt-16">Cart Summary</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center mb-4 border p-2 rounded">
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
          <div className="flex-1">
            <p>{item.name}</p>
            <p className="text-sm">Base Price: ${item.price.toFixed(2)}</p>
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              className="border p-1 w-16"
            />
          </div>
          <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white px-2 py-1 transition-transform transform hover:scale-105 ml-2">
            Remove
          </button>
        </div>
      ))}

      <div className="text-right mt-6">
        <h3 className="text-lg font-bold">Total: ${total.toFixed(2)}</h3>
        <Link to="/thankyou">
          <button className="bg-green-500 text-white px-4 py-2 mt-4 transition-transform transform hover:scale-105">
            Proceed to Checkout
          </button>
        </Link>
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 ml-4 transition-transform transform hover:scale-105">
            Back to Products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
