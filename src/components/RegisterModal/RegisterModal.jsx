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
    if (!value) {
      return "You need a name.";
    }
    return "";
  },
  avatar: (value) => {
    if (!value) {
      return "You should have a profile picture";
    }
    return "";
  },
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

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const { values, handleChange, errors, isValid, resetForm } = useForm(
    defaultValues,
    validators
  );

  useEffect(() => {
    if (isOpen) {
      resetForm(defaultValues);
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) return;
    onRegister(values);
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      {" "}
      <label htmlFor="name" className="modal__label">
        name:{" "}
        <input
          type="text"
          name="name"
          value={values.name}
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.name}</span>
      </label>{" "}
      <label htmlFor="avatar" className="modal__label">
        avatar:{" "}
        <input
          type="url"
          name="avatar"
          value={values.avatar}
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>
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

export default RegisterModal;
