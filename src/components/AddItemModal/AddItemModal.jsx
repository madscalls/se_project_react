import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import "./AddItemModal.css";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const validators = {
    name: (val) => {
      // require at least 3 letters (letters only)
      const letters = (val.match(/[A-Za-z]/g) || []).length;
      return letters >= 3 ? "" : "Title must contain at least 3 letters";
    },
    imageUrl: (val) => {
      if (!val) return "";
      try {
        // require a valid absolute URL
        // new URL will throw if invalid
        // allow http(s) only
        const url = new URL(val);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          return "URL must start with http:// or https://";
        }
        return "";
      } catch (e) {
        return "Please enter a valid URL";
      }
    },
  };

  const { values, handleChange, setValues, errors, isValid } = useForm(
    defaultValues,
    validators
  );

  useEffect(() => {
    if (isOpen) setValues(defaultValues);
  }, [isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) return;
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name:{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.name}</span>
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image:{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.imageUrl}</span>
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-container">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="hot"
            value="hot"
            onChange={handleChange}
            required
          />
          <label htmlFor="hot" className="modal__label_type_radio">
            Hot
          </label>
        </div>
        <div className="modal__radio-container">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="cold"
            value="cold"
            onChange={handleChange}
            required
          />
          <label htmlFor="cold" className="modal__label_type_radio">
            Cold
          </label>
        </div>
        <div className="modal__radio-container">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="warm"
            value="warm"
            onChange={handleChange}
            required
          />
          <label htmlFor="warm" className="modal__label_type_radio">
            Warm
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
