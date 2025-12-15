import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heart from "../../images/heart.svg";
import heartFilled from "../../images/heartfilled.svg";
import "./itemcard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLoggedIn = Boolean(currentUser);

  const likes = Array.isArray(item.likes) ? item.likes : [];
  // likes array assumed to be array of userId strings
  const isLiked = isLoggedIn
    ? likes.some((id) => id === currentUser._id)
    : false;

  const handleClick = () => onCardClick(item);

  const handleLike = (e) => {
    e.stopPropagation(); // prevents opening the modal when liking
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li
      className="card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${item.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="card__header">
        <p className="card__name">{item.name}</p>
        {isLoggedIn && (
          <button
            type="button"
            className={[
              "card__like-button",
              isLiked && "card__like-button_active",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={handleLike}
            aria-label={`${isLiked ? "Remove" : "Add"} ${
              item.name
            } ? "from" : "to"} favorites`}
          >
            <img
              className="card__like-icon"
              src={isLiked ? heartFilled : heart}
              alt=""
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      <img className="card__image" src={item.imageUrl} alt={item.name} />
      <div className="card__footer"></div>
    </li>
  );
}

export default ItemCard;
