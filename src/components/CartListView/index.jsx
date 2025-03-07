import { useContext } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import CartContext from "../../context/CartContext";
import CartItem from "../CartItem";

const CartListView = () => {
  const {
    cartList,
    removeAllCartItems,
  } = useContext(CartContext);

  if (!Array.isArray(cartList) || cartList.length === 0) {
    return (
      <div className="no-order-container">
        <img
          src="https://res.cloudinary.com/dq92tiimk/image/upload/v1735470213/Tasty-Kitchen-App/Images/cooking_1_du55vg.png"
          alt="Empty Cart Illustration"
        />
        <h1>No Order Yet!</h1>
        <p>Your cart is empty. Add something from the menu.</p>
        <Link className="order-now-link" to="/">
          <button className="order-now-btn">Order Now</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-list-view-container">
      <div className="cart-header">
        <h1>Cart</h1>
        <button
          className="remove-btn"
          type="button"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-list-container">
        {cartList.map((eachItem) => (
          <CartItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    </div>
  );
};

export default CartListView;
