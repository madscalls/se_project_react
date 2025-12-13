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
    if (!value) {
      return "Email is required";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return "Must be a valid Email";
    }
    return "";
  },
  password: (value) => {
    if (!value) {
      return "Password is required";
    }

    if (value.length < 6) {
      return "Password must be atleast 6 characters";
    }
    return "";
  },
};

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const { values, handleChange, errors, isValid, resetForm } = useForm(
    defaultValues,
    validators
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    auth
      .getUserInfo(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token invalid:", err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

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
      <label htmlFor="email" className="modal__label">
        email:{" "}
        <input
          type="email"
          name="email"
          value={values.email}
          className="modal__input"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>
      <label htmlFor="password" className="modal__label">
        password:{" "}
        <input
          type="password"
          name="password"
          value={values.password}
          className="modal__input"
          id="password"
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
