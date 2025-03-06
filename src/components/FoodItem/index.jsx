import "./index.css";

const FoodItem = ({ eachItem }) => {
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
        <button className="add-to-cart-btn" type="button"> Add to cart</button>
      </div>
    </li>
  );
};
export default FoodItem;
