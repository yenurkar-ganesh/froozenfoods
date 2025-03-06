import { Link } from "react-router-dom";
import "./index.css";

const RestaurantCard = ({ eachRestaurant }) => {
  const {
    id,
    hasOnlineDelivery,
    imageUrl,
    location,
    menuType,
    name,
    userRating,
  } = eachRestaurant;
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
          <p className="card-location">{location} </p>
          {hasOnlineDelivery && (
            <p className="free-delivery"> 🚲 FREE DELIVERY</p>
          )}
        </div>
      </Link>
    </li>
  );
};

export default RestaurantCard;
