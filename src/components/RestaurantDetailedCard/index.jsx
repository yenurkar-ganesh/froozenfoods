import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import { PuffLoader } from "react-spinners";
import FoodItem from "../FoodItem";
import "./index.css";

const filtersList = [
  { id: 0, displayText: "Veg", value: "VEG" },
  { id: 1, displayText: "Non-Veg", value: "NON-VEG" },
  { id: 2, displayText: "Rating 4.0+", value: "4.0+" },
  { id: 3, displayText: "🥦 & above 4.0", value: "veg&4.0+" },
  { id: 4, displayText: "🍗 & above 4.0", value: "non-veg&4.0+" },
];

const updatedData = (data) => ({
  id: data.id,
  name: data.name,
  costForTwo: data.cost_for_two,
  cuisine: data.cuisine,
  foodItems: data.food_items,
  itemsCount: data.items_count,
  imageUrl: data.image_url,
  location: data.location,
  opensAt: data.opens_at,
  rating: data.rating,
  reviewsCount: data.reviews_count,
});

const RestaurantDetailedCard = () => {
  const [restaurantData, setRestaurantData] = useState({});
  const [filteredRestaurantMenu, setFilteredRestaurantMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const onFilterHandler = (ev) => {
    const { value } = ev.target;
    console.log(value);

    let filteredMenu = filteredRestaurantMenu;

    if (value === "VEG") {
      filteredMenu = restaurantData.foodItems.filter(
        (eachItem) => eachItem.food_type === "VEG"
      );
    } else if (value === "NON-VEG") {
      filteredMenu = restaurantData.foodItems.filter(
        (eachItem) => eachItem.food_type === "NON-VEG"
      );
    } else if (value === "4.0+") {
      filteredMenu = restaurantData.foodItems.filter(
        (eachItem) => eachItem.rating >= 4.0
      );
    } else if (value === "veg&4.0+") {
      filteredMenu = restaurantData.foodItems.filter(
        (eachItem) => eachItem.rating >= 4.0 && eachItem.food_type === "VEG"
      );
    } else if (value === "non-veg&4.0+") {
      filteredMenu = restaurantData.foodItems.filter(
        (eachItem) => eachItem.rating >= 4.0 && eachItem.food_type === "NON-VEG"
      );
    }
    setFilteredRestaurantMenu(filteredMenu);
  };

  const getDetailedData = async () => {
    const jwtToken = Cookies.get("jwt_token");

    try {
      const url = `https://apis.ccbp.in/restaurants-list/${id}`;
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const updatedRestaurantData = updatedData(data);
        setRestaurantData(updatedRestaurantData);
        setFilteredRestaurantMenu(updatedRestaurantData.foodItems);
        // console.log(updatedRestaurantData);
      }
    } catch (error) {
      console.error(`Error while fetching restaurant data: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetailedData();
  }, [id]);

  // console.log(filteredRestaurantMenu);

  return (
    <div className="restaurant-detailed-card-container">
      <Navbar />
      {isLoading ? (
        <div className="loader-container">
          <PuffLoader color="#FFA07A" size={80} />
          <h1>`Serving flavors in just a moment...`🍝</h1>
        </div>
      ) : (
        <div className="restaurant-detailed-card-section">
          <div className="restaurant-banner">
            <section className="restaurant-detailed-header-info">
              <div className="restaurant-detailed-info">
                <h1>{restaurantData.name}</h1>
                <p>{restaurantData.cuisine} </p>
                <p>{restaurantData.location} </p>
                <section className="rating-section">
                  <div className="rating-container">
                    <p className="rating">🌟 {restaurantData.rating} </p>
                    <p className="responses">
                      {restaurantData.reviewsCount}+ Responses{" "}
                    </p>
                  </div>
                  <div className="vertical-bar"></div>
                  <div className="cost-for-two-container">
                    <p className="cost-for-two">
                      ₹ {restaurantData.costForTwo}
                    </p>
                    <p className="cost-for-two-info">Cost For Two</p>
                  </div>
                </section>
              </div>
            </section>
            <img
              src={restaurantData.imageUrl}
              alt={restaurantData.name}
              className="restaurant-detailed-image"
            />
          </div>
          <div className="restaurant-menu-container">
            <h2> Menu ({restaurantData.name}) </h2>
            <hr />
            <div className="filter-container">
              <p>Filter by </p>
              <select
                defaultValue=""
                onChange={onFilterHandler}
                className="sort-by-select"
              >
                <option disabled value="">
                  Select Filter
                </option>
                {filtersList.map((eachFilter) => (
                  <option
                    key={eachFilter.id}
                    value={eachFilter.value}
                    className="filter-item"
                  >
                    {eachFilter.displayText}
                  </option>
                ))}
              </select>
            </div>
            <ul className="menu-list-section">
              {filteredRestaurantMenu.length === 0 ? (
                <div className="no-food-items-container">
                  <h1>
                    `When there’s no food on the menu, make your own feast.`
                  </h1>
                </div>
              ) : (
                filteredRestaurantMenu.map((eachItem) => (
                  <FoodItem key={eachItem.id} eachItem={eachItem} />
                ))
              )}
            </ul>
            <div className="menu-header">
              <img
                src="https://res.cloudinary.com/dq92tiimk/image/upload/v1741200469/Tasty-Kitchen-App/Icons/21504977_6413871_lj2xss.svg"
                alt="menu-logo"
                className="menu-logo"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailedCard;
