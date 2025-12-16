import "../ModalWithForm/ModalWithForm.css";
import closebtn from "../../images/close-btn.svg";
import useModalClose from "../../hooks/useModalClose";

function ModalWithForm({
  children,
  buttonText = "Save",
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  isFormValid = true,
  isLoading = false,
  secondaryButtonText,
  secondaryButtonAction,
}) {
  useModalClose(isOpen, onClose);
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content-form">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img className="modal__close-btn" alt="close" src={closebtn} />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__buttons">
            <button
              className="modal__submit"
              type="submit"
              disabled={!isFormValid || isLoading}
              aria-disabled={!isFormValid || isLoading}
            >
              {buttonText}
            </button>
            {secondaryButtonText && secondaryButtonAction && (
              <button
                type="button"
                onClick={secondaryButtonAction}
                className="modal__secondary-btn"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
