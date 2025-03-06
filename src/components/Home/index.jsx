import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Cookies from "js-cookie";
import RestaurantCard from "../RestaurantCard";
import { HashLoader } from "react-spinners";
import "./index.css";

const sortByOptions = [
  { id: 0, displayText: "Highest", value: "Highest" },
  { id: 2, displayText: "Lowest", value: "Lowest" },
];

const filtersList = [
  { id: 0, displayText: "Veg", value: "VEG" },
  { id: 1, displayText: "Non-Veg", value: "NON-VEG" },
  { id: 2, displayText: "Rating 4.0+", value: "4.0+" },
  { id: 3, displayText: "🥦 & above 4.0", value: "veg&4.0+" },
  { id: 4, displayText: "🍗 & above 4.0", value: "non-veg&4.0+" },
];

const updatedData = (data) =>
  data.restaurants.map((eachData) => ({
    id: eachData.id,
    costForTwo: eachData.cost_for_two,
    cuisine: eachData.cuisine,
    groupByTime: eachData.group_by_time,
    hasOnlineDelivery: eachData.has_online_delivery,
    hasTableBooking: eachData.has_table_booking,
    imageUrl: eachData.image_url,
    isDeliveringNow: eachData.is_delivering_now,
    location: eachData.location,
    menuType: eachData.menu_type,
    name: eachData.name,
    opensAt: eachData.opens_at,
    userRating: eachData.user_rating,
  }));

const Home = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurantsList, setFilteredRestaurantsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortBy, setSortBy] = useState("Highest");

  const onFilterChangeHandler = (filterVal) => {
    let filteredRestaurantData = restaurantList;

    switch (filterVal) {
      case "VEG":
        filteredRestaurantData = restaurantList.filter(
          (eachItem) => eachItem.menuType === "VEG"
        );
        break;
      case "NON-VEG":
        filteredRestaurantData = restaurantList.filter(
          (eachItem) => eachItem.menuType === "NON-VEG"
        );
        break;
      case "4.0+":
        filteredRestaurantData = restaurantList.filter(
          (eachItem) => eachItem.userRating.rating >= 4.0
        );
        break;
      case "veg&4.0+":
        filteredRestaurantData = restaurantList.filter(
          (eachItem) =>
            eachItem.userRating.rating >= 4.0 && eachItem.menuType === "VEG"
        );
        break;
      case "non-veg&4.0+":
        filteredRestaurantData = restaurantList.filter(
          (eachItem) =>
            eachItem.userRating.rating >= 4.0 && eachItem.menuType === "NON-VEG"
        );
        break;
      default:
        filteredRestaurantData = restaurantList;
    }

    setFilteredRestaurantsList(filteredRestaurantData);
    setActiveFilter(filterVal);
  };

  const getRestaurantListData = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/restaurants-list?offset=0&limit=300&sort_by_rating=${sortBy}`;
    const options = {
      headers: { Authorization: `Bearer ${jwtToken}` },
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const updatedRestaurantList = updatedData(data);
        setRestaurantList(updatedRestaurantList);
        setFilteredRestaurantsList(updatedRestaurantList);
      }
    } catch (error) {
      console.error(`Error fetching restaurant list: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const onSortHandler = (ev) => {
    setSortBy(ev.target.value);
    setIsLoading(true);
  };

  useEffect(() => {
    getRestaurantListData();
  }, [sortBy]);

  return (
    <div className="home-container">
      <Navbar />
      <section className="search-section">
        <img
          src="https://res.cloudinary.com/dq92tiimk/image/upload/v1741156702/Tasty-Kitchen-App/Icons/10085382_cnqyyt.jpg"
          alt="search-banner"
          className="search-banner-image"
        />
        <div className="search-banner-info">
          <h1>🥢Unlock Hidden & Rich Food Gems Nearby!</h1>
          <input
            type="text"
            placeholder="Search Favorite Restaurants..."
            className="search-input"
          />
        </div>
      </section>
      <section className="home-and-restaurant-section">
        <div className="meta-banner">
          <h2>Popular Restaurants</h2>
          <div className="meta-sort-container">
            <p>Select your favorite restaurants special dish!</p>
            <select onChange={onSortHandler} className="sort-by-select">
              {sortByOptions.map((eachOption) => (
                <option key={eachOption.id} value={eachOption.value}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
          <hr />
          <ul className="restro-filter-container fixed-filter">
            {filtersList.map((eachFilter) => (
              <li key={eachFilter.id} className="filter-card">
                <button
                  onClick={() => onFilterChangeHandler(eachFilter.value)}
                  className={`filter-card-btn ${
                    activeFilter === eachFilter.value ? "active-filter-btn" : ""
                  }`}
                >
                  {eachFilter.displayText}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ul className="restaurant-card-list-section">
          {isLoading ? (
            <div className="loader-container">
              <HashLoader color="#ff7f50" size={80} />
              <h1>🍕 Baking a list of mouthwatering restaurants...</h1>
            </div>
          ) : filteredRestaurantsList.length === 0 ? (
            <div className="no-restaurant-found-container">
              <img
                src="https://res.cloudinary.com/dq92tiimk/image/upload/v1735470213/Tasty-Kitchen-App/Images/cooking_1_du55vg.png"
                alt=""
              />
              <h1>No restaurants found! 🍽️</h1>
            </div>
          ) : (
            filteredRestaurantsList.map((eachRestaurant) => (
              <RestaurantCard
                key={eachRestaurant.id}
                eachRestaurant={eachRestaurant}
              />
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default Home;
