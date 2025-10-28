import "./ItemModal.css";
import closebtnWhite from "../../images/close-btn-WHITE.svg";
import useModalClose from "../../hooks/useModalClose";

const ItemModal = ({
  isOpen,
  onClose,
  card,
  onDelete,
  isLoading,
  buttonText = "Delete item",
}) => {
  const handleDelete = () => onDelete?.(card);

  useModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img className="modal__close-btn" alt="close" src={closebtnWhite} />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-top">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              className="modal__delete-btn"
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {buttonText}
            </button>
          </div>

          <p className="modal__weather">Weather: {card.weather} </p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
