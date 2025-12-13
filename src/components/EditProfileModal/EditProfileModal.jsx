import "./EditProfileModal.css";
import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const validators = {
  name: (value) => {
    if (!value) return "Name is required";
    return "";
  },
  avatar: (value) => {
    if (!value) return "Avatar URL is required";
    try {
      const url = new URL(value);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return "URL must start with http:// or https://";
      }
      return "";
    } catch {
      return "Please enter a valid URL";
    }
  },
};

const EditProfileModal = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);

  const defaultValues = {
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  };

  const { values, handleChange, errors, isValid, resetForm } = useForm(
    defaultValues,
    validators
  );

  // Prefill every time it opens (and when currentUser changes)
  useEffect(() => {
    if (isOpen) {
      resetForm({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
    }
  }, [isOpen, currentUser, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onUpdateUser(values); // { name, avatar }
  };

  return (
    <ModalWithForm
      title="Edit profile"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
      buttonText={isLoading ? "Saving..." : "Save"}
    >
      <label className="modal__label" htmlFor="edit-profile-name">
        Name:
        <input
          id="edit-profile-name"
          type="text"
          name="name"
          className="modal__input"
          value={values.name}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.name}</span>
      </label>

      <label className="modal__label">
        Avatar URL:
        <input
          id="edit-profile-avatar"
          type="url"
          name="avatar"
          className="modal__input"
          value={values.avatar}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
