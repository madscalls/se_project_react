import "./ItemModal.css";
import closebtn from "../../images/close-btn.svg";

const ItemModal = ({ onClose, card }) => {
  return (
    <div className="modal modal__opened">
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img className="modal__close-btn" alt="close" src={closebtn} />
        </button>
        <img src={card.link} alt="" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather} </p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
