import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./toggleswitch.css";
import { useContext } from "react";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={currentTemperatureUnit === "C"}
      />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__text_F toggle-switch__text">F</span>
      <span className="toggle-switch__text_C toggle-switch__text">C</span>
    </label>
  );
}
