import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import "./RegisterModal.css";

const defaultValues = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

const validators = {
  name: (value) => {
    if (!value) return "You need a name.";
    return "";
  },
  avatar: (value) => {
    if (!value) return "You should have a profile picture";
    return "";
  },
  email: (value) => {
    if (!value) return "Email is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return "Must be a valid Email";
    }
    return "";
  },
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  },
};

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const { values, handleChange, errors, isValid, resetForm } = useForm(
    defaultValues,
    validators
  );

  useEffect(() => {
    if (isOpen) resetForm(defaultValues);
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) return;
    onRegister(values);
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <label htmlFor="register-name" className="modal__label">
        Name:
        <input
          id="register-name"
          type="text"
          name="name"
          value={values.name ?? ""}
          className="modal__input"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.name}</span>
      </label>

      <label htmlFor="register-avatar" className="modal__label">
        Avatar:
        <input
          id="register-avatar"
          type="url"
          name="avatar"
          value={values.avatar ?? ""}
          className="modal__input"
          placeholder="Avatar URL"
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>

      <label htmlFor="register-email" className="modal__label">
        Email:
        <input
          id="register-email"
          type="email"
          name="email"
          value={values.email ?? ""}
          className="modal__input"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password:
        <input
          id="register-password"
          type="password"
          name="password"
          value={values.password ?? ""}
          className="modal__input"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.password}</span>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
