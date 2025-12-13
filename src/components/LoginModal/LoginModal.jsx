import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import "./LoginModal.css";

const defaultValues = {
  email: "",
  password: "",
};

const validators = {
  email: (value) => {
    if (!value) return "Email is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return "Must be a valid Email";
    }
    return "";
  },
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  },
};

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const { values, handleChange, errors, isValid, resetForm } = useForm(
    defaultValues,
    validators
  );

  useEffect(() => {
    if (isOpen) {
      resetForm(defaultValues);
    }
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) return;
    onLogin(values);
  }

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <label htmlFor="login-email" className="modal__label">
        Email:
        <input
          id="login-email"
          type="email"
          name="email"
          value={values.email}
          className="modal__input"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password:
        <input
          id="login-password"
          type="password"
          name="password"
          value={values.password}
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

export default LoginModal;
