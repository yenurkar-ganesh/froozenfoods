import { useContext } from "react";
import CartContext from "../../context/CartContext";
import "./index.css";

const CartItem = ({ eachItem }) => {
  const { id, quantity, name, cost, image_url, rating, food_type } = eachItem;
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext);
  return (
    <li id={id} className="cartItem">
      <section className="cart-item-header-info">
        <img src={image_url} alt={name} className="cart-item-img" />
        <div className="cart-item-info-section">
          <section className="cart-item-name-foodtype">
            <p className="cart-item-name">{name} </p>
            <p className="cart-item-food-type">
              {food_type === "VEG" ? `🥦` : `🍗`}
            </p>
          </section>
          <p className="cart-item-rating">⭐ {rating} </p>
          <p className="cart-item-cost">₹ {cost} </p>
        </div>
      </section>
      <div className="cart-item-quantity-section">
        <button
          onClick={() => decrementCartItemQuantity(id)}
          type="button"
          className="quantity-btn"
        >
          -
        </button>
        <p className="quantity">{quantity}</p>
        <button
          onClick={() => incrementCartItemQuantity(id)}
          type="button"
          className="quantity-btn"
        >
          +
        </button>
      </div>
      <p className="cart-item-total-price">₹ {quantity * cost} </p>
      <button
        className="remove-cart-item-btn"
        onClick={() => {
          removeCartItem(id);
        }}
        type="button"
      >
        Remove{" "}
      </button>
    </li>
  );
};

export default CartItem;
