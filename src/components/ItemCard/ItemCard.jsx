import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLoggedIn = Boolean(currentUser);

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

        {isLoggedIn && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
            aria-label="Like"
          />
        )}
      </div>
    </li>
  );
}

export default ItemCard;
