import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { PuffLoader, BeatLoader, ClipLoader } from "react-spinners";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [submitErr, setSubmitErr] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);

  const navigate = useNavigate();

  const usernameHandler = (ev) => {
    setUsername(ev.target.value);
  };

  const passwordHandler = (ev) => {
    setPassword(ev.target.value);
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 2 });
    navigate("/");
  };

  const onSubmitFailure = (errMsg) => {
    setSubmitErr(true);
    setErrMsg(errMsg);
  };

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    SetIsLoading(true);
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        onSubmitSuccess(data.jwt_token);
      } else {
        onSubmitFailure(data.error_msg || "Invalid credentials");
      }
    } catch (error) {
      console.error(error, `Error while fetching login details`);
      onSubmitFailure("Something went wrong. Please try again.");
    } finally {
      SetIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img
        src="https://res.cloudinary.com/dq92tiimk/image/upload/v1741088693/Tasty-Kitchen-App/Icons/Secure-login_qae8gs.svg"
        alt="login-banner"
        className="login-banner"
      />
      <div className="login-form-section">
        <form onSubmit={onSubmitHandler} className="form">
          <h1>Login</h1>
          <div className="input-container">
            <label className="labels" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              id="username"
              className="input-field"
              onChange={usernameHandler}
              value={username}
            />
          </div>
          <div className="input-container">
            <label className="labels" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              className="input-field"
              onChange={passwordHandler}
              value={password}
            />
          </div>
          <div className="login-btn-container">
            {isLoading ? (
              <PuffLoader color="#36d7b7" size={28} />
            ) : (
              <button type="submit" className="login-button">
                LOGIN
              </button>
            )}
          </div>

          {submitErr && <p className="login-error">*{errMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
