import { useContext } from "react";
import Navbar from "../Navbar";
import "./index.css";
import CartContext from "../../context/CartContext";
import RestaurantCard from "../RestaurantCard";

const WishList = () => {
  const { wishList } = useContext(CartContext);

  return (
    <div className="wishlist-container">
      <Navbar />
      <div className="wishlist-section">
        <h1>WishList</h1>
        <ul className="wishlist-item-section">
          {wishList.length === 0 ? (
            <div className="wishlist-no-item-container">
              <img
                src="https://res.cloudinary.com/dq92tiimk/image/upload/v1741369382/Tasty-Kitchen-App/Icons/8967753_4057577_wnrlij.svg"
                alt="empty wishlist"
                className="empty-wishlist-logo"
              />
              <h1>"Save Your Faves — Add to Wishlist Now!" ⭐</h1>
              <p>Add Your Favorite Restaurants to your wishlist</p>
            </div>
          ) : (
            wishList.map((eachRestaurant) => (
              <RestaurantCard
                key={eachRestaurant.id}
                eachRestaurant={eachRestaurant}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
export default WishList;
