import React from "react";

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
});

export default CartContext;
