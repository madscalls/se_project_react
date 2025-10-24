import "./ItemModal.css";
import closebtnWhite from "../../images/close-btn-WHITE.svg";

const ItemModal = ({ isOpen, onClose, card }) => {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`} onClick={onClose}>
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} type="button" className="modal__close">
          <img className="modal__close-btn" alt="close" src={closebtnWhite} />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather} </p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
