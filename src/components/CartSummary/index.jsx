import Cart from "../Cart";
import "./index.css";
import CartContext from "../../context/CartContext";
import { useContext } from "react";

const CartSummery = () => {
  const { cartList } = useContext(CartContext);

  const totalQuantity = cartList.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartList.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );

  return (
    <>
      <div className="cart-summery-container">
        <hr />
        <section className="summery-section">
          <h2>Cart Summery</h2>
          <div className="total-summery">
            <p>Total Cart Items : {totalQuantity} </p>
            <h3>Total Price - ₹ {totalPrice}/-</h3>
          </div>
        </section>
      </div>
    </>
  );
};

export default CartSummery;
