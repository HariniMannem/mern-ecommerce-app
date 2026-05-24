import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {

  const existingProduct = cartItems.find(
    (item) => item._id === product._id
  );

  if (existingProduct) {

    const updatedCart = cartItems.map(
      (item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
    );

    setCartItems(updatedCart);

  } else {

    setCartItems([
      ...cartItems,
      {
        ...product,
        quantity: 1
      }
    ]);

  }
};

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter(
      (_, i) => i !== index
    );

    setCartItems(updatedCart);
  };
  const increaseQuantity = (id) => {

  const updatedCart = cartItems.map(
    (item) =>
      item._id === id
        ? {
            ...item,
            quantity: item.quantity + 1
          }
        : item
  );

  setCartItems(updatedCart);
};
const decreaseQuantity = (id) => {

  const updatedCart = cartItems
    .map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: item.quantity - 1
          }
        : item
    )
    .filter((item) => item.quantity > 0);

  setCartItems(updatedCart);
};

  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "20px",
          display: "flex",
          gap: "20px"
        }}
      >
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link>
        <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
>
  Logout
</button>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products addToCart={addToCart} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            </ProtectedRoute>
          }
        />
        <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout cartItems={cartItems} />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;