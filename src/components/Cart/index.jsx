import Navbar from "../Navbar";
import CartListView from "../CartListView";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h1>Cart</h1>
        <CartListView />
      </div>
    </>
  );
};

export default Cart;
