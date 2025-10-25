import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { APIkey, coordinates } from "../../utils/constants";
import api from "../../utils/api.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  //loading text boolean
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    api
      .addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeAllModals();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (card) => {
    const id = card.id ?? card._id;
    if (!id) return;

    api
      .removeItem(id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => (item.id ?? item._id) !== id)
        );
        closeAllModals();
      })
      .catch(console.error);
  };

  const closeAllModals = () => {
    setActiveModal("");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    api
      .getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch(console.error);
  }, []);
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <AddItemModal
          onAddItem={onAddItem}
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
        />
        <ItemModal
          card={selectedCard || {}}
          onClose={closeActiveModal}
          // activeModal={activeModal}
          isOpen={activeModal === "preview"}
          onDelete={handleDeleteItem}
        />

        {/* {activeModal === "preview" && (
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
          />
        )} */}
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}
export default App;
