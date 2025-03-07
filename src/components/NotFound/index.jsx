import { Link } from "react-router-dom";
import "./index.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <img
        className="error-img"
        src="https://res.cloudinary.com/dq92tiimk/image/upload/v1735469273/Tasty-Kitchen-App/Images/erroring_1_p0rlj8.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p className="desc">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        <button type="button" className="home-page-btn">
          Home Page
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
