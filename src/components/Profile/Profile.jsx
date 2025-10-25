import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import SideBar from "../Sidebar/Sidebar";

export default function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
}) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
