import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import * as auth from "../../utils/auth.js";
import { APIkey, defaultCoordinates } from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import useCurrentLocation from "../../hooks/useCurrentLocation";

import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import LoginModal from "../LoginModal/LoginModal.jsx";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";

import ProtectedRoute from "../../utils/ProtectedRoute.jsx";

import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const navigate = useNavigate();

  const { location, error: locationError } = useCurrentLocation();

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleOpenEditProfile = () => setActiveModal("edit-profile");

  const handleOpenRegister = () => {
    setActiveModal("register");
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    closeActiveModal();
    navigate("/", { replace: true });
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);

    return auth
      .signIn({ email, password })
      .then((res) => {
        if (!res?.token) {
          return Promise.reject("No token returned from server");
        }

        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return auth.getUserInfo(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error("Login failed:", err);
        throw err;
      })
      .finally(() => setIsLoading(false));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    setIsLoading(true);

    return auth
      .signUp({ name, avatar, email, password })
      .then(() => auth.signIn({ email, password }))
      .then((res) => {
        if (!res?.token) {
          return Promise.reject("No token returned from server");
        }

        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return auth.getUserInfo(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        throw err;
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdateUser = ({ name, avatar }) => {
    setIsLoading(true);

    return api
      .updateUser({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Update user failed:", err);
      })
      .finally(() => setIsLoading(false));
  };

  const onAddItem = (inputValues) => {
    if (!isLoggedIn) return;

    setIsLoading(true);

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    api
      .addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const request = !isLiked ? api.addCardLike(id) : api.removeCardLike(id);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  const handleDeleteItem = (card) => {
    if (!isLoggedIn) return;

    const id = card.id ?? card._id;
    if (!id) return;

    setIsLoading(true);

    api
      .removeItem(id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => (item.id ?? item._id) !== id)
        );
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    auth
      .getUserInfo(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    const coords = location || defaultCoordinates;

    getWeather(coords, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Weather fetch error:", error);
      });
  }, [location]);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch((error) => {
        console.error("Items fetch error:", error);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={handleOpenRegister}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleLogin={handleLogin}
                      onEditProfile={handleOpenEditProfile}
                      onSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            onAddItem={onAddItem}
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            buttonText={isLoading ? "Saving..." : "Add garment"}
            isLoading={isLoading}
          />

          <ItemModal
            card={selectedCard || {}}
            onClose={closeActiveModal}
            isOpen={activeModal === "preview"}
            onDelete={handleDeleteItem}
            buttonText={isLoading ? "Deleting..." : "Delete item"}
            isLoading={isLoading}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            buttonText={isLoading ? "Next" : "Sign up"}
            onRegister={handleRegister}
            onModalSwitch={() => setActiveModal("login")}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={() => setActiveModal("")}
            buttonText={isLoading ? "Logging in..." : "Log in"}
            onLogin={handleLogin}
            onModalSwitch={() => setActiveModal("register")}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
