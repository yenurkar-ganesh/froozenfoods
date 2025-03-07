import { useState, useContext, useEffect } from "react";
import "./index.css";
import CartContext from "../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodItem = ({ eachItem }) => {
  const [quantity, setQuantity] = useState(0);
  const {
    cartList,
    addCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext);

  const quantityInCart = cartList.find(
    (eachCart) => eachCart.id === eachItem.id
  );

  useEffect(() => {
    setQuantity(quantityInCart ? quantityInCart.quantity : 0);
  }, [quantityInCart]);

  const incrementHandler = () => {
    if (quantityInCart) {
      incrementCartItemQuantity(eachItem.id);
      toast.info(`${eachItem.name} quantity increased by 1`, {
        toastId: "increment-toast",
      });
    } else {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementHandler = () => {
    if (quantityInCart?.quantity > 1) {
      decrementCartItemQuantity(eachItem.id);
      toast.info(`${eachItem.name} quantity decreased by 1`, {
        toastId: "decrement-toast",
      });
    } else if (quantityInCart && quantityInCart.quantity === 1) {
      removeCartItem(eachItem.id);
      toast.error(`${eachItem.name} removed from cart`, {
        toastId: "remove-toast",
      });
      setQuantity(0);
    }
  };

  const onAddToCartHandler = () => {
    if (quantity > 0) {
      addCartItem({ ...eachItem, quantity });
      toast.success(`${eachItem.name} added to cart`);
    }
  };

  return (
    <li className="menu-item">
      <img
        className="menu-item-img"
        src={eachItem.image_url}
        alt={eachItem.name}
      />
      <div className="menu-item-info">
        <section className="menu-item-header">
          <p className="menu-item-name">
            {eachItem.name} {eachItem.food_type === "VEG" ? `🥦` : `🍗`}{" "}
          </p>
        </section>

        <p className="menu-item-cost">₹ {eachItem.cost} </p>
        <p className="menu-item-rating">⭐ {eachItem.rating} </p>

        <section className="counter-section">
          <button
            onClick={decrementHandler}
            type="button"
            className="counter-btn"
            disabled={quantity === 0}
          >
            -
          </button>
          <p className="counter-value">{quantity}</p>
          <button
            onClick={incrementHandler}
            type="button"
            className="counter-btn"
          >
            +
          </button>
          {quantityInCart ? null : (
            <>
              <div className="vertical-bar-black"></div>
              <button
                onClick={onAddToCartHandler}
                className="add-to-cart-btn"
                type="button"
                disabled={quantity === 0}
              >
                Add to Cart
              </button>
            </>
          )}
        </section>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </li>
  );
};

export default FoodItem;
