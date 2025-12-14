import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heart from "../../images/heart.svg";
import heartFilled from "../../images/heartfilled.svg";
import "./itemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLoggedIn = Boolean(currentUser);

  const likes = Array.isArray(item.likes) ? item.likes : [];
  // likes array assumed to be array of userId strings
  const isLiked = isLoggedIn
    ? (item.likes || []).some((id) => id === currentUser._id)
    : false;

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleClick = () => onCardClick(item);

  const handleLike = (e) => {
    e.stopPropagation(); // prevents opening the modal when liking
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card" onClick={handleClick}>
      <img className="card__image" src={item.imageUrl} alt={item.name} />
      <div className="card__footer">
        <p className="card__name">{item.name}</p>
        <button
          type="button"
          className={[
            "card__like-button",
            isLiked && "card__like-button_active",
            !isLoggedIn && "card__like-button_hidden",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={handleLike}
          aria-label={isLiked ? "Unlike" : "Like"}
          aria-pressed={isLiked}
          disabled={!isLoggedIn}
        >
          <img
            className="card__like-icon"
            src={isLiked ? heartFilled : heart}
            alt="like button"
          />
        </button>
      </div>
    </li>
  );
}

export default ItemCard;
