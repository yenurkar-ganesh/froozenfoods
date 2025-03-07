import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Cart from "./components/Cart";
import RestaurantDetailedCard from "./components/RestaurantDetailedCard";
import ProtectedRoute from "./components/ProtectedRoute";
import CartContext from "./context/CartContext";
import "./App.css";

function App() {
  const [cartList, setCartList] = useState(() => {
    const storedCart = localStorage.getItem("cartList");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addCartItem = (item) => {
    setCartList((prevList) => {
      const existingItem = prevList.find((eachItem) => eachItem.id === item.id);
      if (existingItem) {
        return prevList.map((eachItem) =>
          eachItem.id === item.id
            ? { ...eachItem, quantity: eachItem.quantity + 1}
            : eachItem
        );
      }
      return [...prevList, item];
    });
  };

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const removeCartItem = (id) => {
    setCartList((prevList) =>
      prevList.filter((eachItem) => eachItem.id !== id)
    );
  };

  const incrementCartItemQuantity = (id) => {
    setCartList((prevList) =>
      prevList.map((eachItem) =>
        eachItem.id === id
          ? { ...eachItem, quantity: eachItem.quantity + 1 }
          : eachItem
      )
    );
  };

  const decrementCartItemQuantity = (id) => {
    setCartList((prevList) =>
      prevList
        .map((eachItem) =>
          eachItem.id === id
            ? { ...eachItem, quantity: eachItem.quantity - 1 }
            : eachItem
        )
        .filter((eachItem) => eachItem.quantity > 0)
    );
  };

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant/:id"
            element={
              <ProtectedRoute>
                <RestaurantDetailedCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
