import React from "react";

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
  wishList: [],
  addWishListItem: () => {},
  removeWishListItem: () => {},
});

export default CartContext;
