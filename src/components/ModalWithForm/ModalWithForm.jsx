import "../ModalWithForm/ModalWithForm.css";
import closebtn from "../../images/close-btn.svg";

function ModalWithForm({ children, buttonText, title }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <div>
          <h2 className="modal__title">{title}</h2>
          <button type="button" className="modal__close">
            <img className="modal__close-btn" alt="close" src={closebtn} />
          </button>
          <form className="modal__form">
            {children}

            <button className="modal__submit" type="submit">
              {buttonText}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalWithForm;
