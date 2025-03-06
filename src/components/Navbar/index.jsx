import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <section className="logo-section">
          <h1 className="company-logo">❄️</h1>
          <span className="vertical-bar"></span>
          <h2>FrozenFoood</h2>
        </section>
        <ul className="nav-link-section">
          <li className="nav-list-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-list-item">
            <Link className="nav-link" to="/cart">
              Cart
            </Link>
          </li>
          <li className="nav-list-item">
            <button
              className="logout-btn"
              type="button"
              onClick={logoutHandler}
            >
              LOGOUT
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
