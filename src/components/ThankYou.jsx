import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
      <p>Your order has been placed successfully.</p>

      {/* Button to return to Product List */}
      <Link to="/">
        <button className="bg-blue-500 text-white px-4 py-2 mt-6">Back to Products</button>
      </Link>
    </div>
  );
}

export default ThankYou;
