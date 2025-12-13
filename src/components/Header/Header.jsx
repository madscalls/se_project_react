import "../Header/header.css";
import { NavLink } from "react-router-dom";
import logo from "../../images/Logo.svg";
import { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const isLoggedIn = Boolean(currentUser);
  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";

  const firstLetter = userName ? userName.trim()[0].toUpperCase() : "";

  return (
    <header className="header">
      <NavLink className="header__nav-link" to="/">
        <img className="header__logo" alt="WTWR logo" src={logo} />
      </NavLink>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__controls">
        <ToggleSwitch />

        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        )}
      </div>

      {isLoggedIn ? (
        <NavLink className="header__nav-link" to="/profile">
          <div className="header__user-container">
            <p className="header__username">{userName}</p>

            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="header__avatar" />
            ) : (
              <div className="header__avatar-placeholder">{firstLetter}</div>
            )}
          </div>
        </NavLink>
      ) : (
        <div className="header__user-container">
          <button
            type="button"
            className="header__auth-btn"
            onClick={onLoginClick}
          >
            Log in
          </button>
          <button
            type="button"
            className="header__auth-btn"
            onClick={onRegisterClick}
          >
            Sign up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
