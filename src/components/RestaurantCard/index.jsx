import { Link } from "react-router-dom";
import { RiHeart3Line } from "react-icons/ri";
import "./index.css";
import { useContext } from "react";
import CartContext from "../../context/CartContext";

const RestaurantCard = ({ eachRestaurant }) => {
  const { wishList, addWishListItem, removeWishListItem } =
    useContext(CartContext);

  const {
    id,
    hasOnlineDelivery,
    imageUrl,
    location,
    menuType,
    name,
    userRating,
  } = eachRestaurant;

  const isItemExistInWishlist = wishList.some((item) => item.id === id);

  const toggleWishlistHandler = () => {
    if (isItemExistInWishlist) {
      removeWishListItem(id);
      console.log(`${name} removed from wishlist`);
    } else {
      addWishListItem(eachRestaurant);
      console.log(`${name} added to wishlist`);
    }
  };

  return (
    <li className="card-item">
      <Link to={`/restaurant/${id}`} className="card-link">
        <img src={imageUrl} alt={name} className="card-img" />
        <div className="card-info">
          <div className="card-header">
            <section className="card-name-section">
              {menuType === "VEG" ? `🥦` : `🍗`}
              <p className="card-name">{name}</p>
            </section>
            <div className="rating-section">
              <span className="rating-star">⭐</span>
              <p className="rating">
                {userRating.rating} ({userRating.total_reviews}+)
              </p>
            </div>
          </div>
          <p className="card-location">{location}</p>
          {hasOnlineDelivery && (
            <p className="free-delivery"> 🚲 FREE DELIVERY</p>
          )}
        </div>
      </Link>
      <button onClick={toggleWishlistHandler} className="like-button">
        <RiHeart3Line
          size={25}
          className={isItemExistInWishlist ? "active-like-btn" : "like-icon"}
        />
      </button>
    </li>
  );
};

export default RestaurantCard;
