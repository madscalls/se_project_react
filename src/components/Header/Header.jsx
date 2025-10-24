import "../Header/header.css";
import { NavLink } from "react-router-dom";
import logo from "../../images/Logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink className="header__nav-link" to="/">
        <img className="header__logo" alt="WTWR logo" src={logo} />
      </NavLink>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <NavLink className="header__nav-link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">NAME</p>{" "}
          <img src={avatar} alt="Terrance Tegegne" className="header__avatar" />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
