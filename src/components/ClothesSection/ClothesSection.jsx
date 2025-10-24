import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems = [],
  handleCardClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <div className="clothes-section__header">
          <p className="clothes-section__header-text">Your items</p>
          <button className="clothes-section__new-btn">+Add new</button>
        </div>
        <ul className="clothes-section__items">
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
