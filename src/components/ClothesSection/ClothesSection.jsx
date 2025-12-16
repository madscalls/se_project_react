import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  clothingItems = [],
  onCardClick,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  //show only users items
  const userItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <div className="clothes-section__header">
          <p className="clothes-section__header-text">Your items</p>
          <button className="clothes-section__new-btn" onClick={handleAddClick}>
            +Add new
          </button>
        </div>

        <ul className="clothes-section__items">
          {userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
