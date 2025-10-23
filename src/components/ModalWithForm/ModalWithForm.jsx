import "../ModalWithForm/ModalWithForm.css";
import closebtn from "../../images/close-btn.svg";

function ModalWithForm({
  children,
  buttonText = "Save",
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content-form">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img className="modal__close-btn" alt="close" src={closebtn} />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <button className="modal__submit" type="submit">
            {buttonText}{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
